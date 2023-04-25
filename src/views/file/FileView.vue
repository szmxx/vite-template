<!--
 * @Author: cola
 * @Date: 2022-11-16 14:59:24
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="file">
    <el-button @click="clickEvent">选取文件</el-button>
    <div class="file-list">
      <div v-for="i in fileList" :key="i.downloadPath">
        <div>{{ i.filename }}</div>
        <el-button @click="download(i.downloadPath)">下载</el-button>
      </div>
    </div>

    <input
      ref="fileRef"
      style="display: none"
      multiple
      type="file"
      @change="changeEvent"
    />
  </div>
</template>

<script setup lang="ts">
  import SparkMD5 from 'spark-md5'
  import {
    uploadChunk,
    getChunks,
    mergeChunk,
    downloadFile,
    headDownload,
    FileItem,
  } from '@/api/file'
  import { saveAs } from '@/utils'
  const fileRef = ref()
  const CHUNK_SIZE = 10 * 1024 * 1024
  const slice = File.prototype.slice
  const fileList = ref<FileItem[]>([])
  async function changeEvent(evt: any) {
    const files = evt?.target?.files
    const length = files.length
    for (let i = 0; i < length; i++) {
      const md5 = await computedMD5(files[i])
      const chunks = await getUploadChunks(files[i], md5)
      if (chunks.length) {
        uploadParallel(files[i], chunks, md5)
      }
    }
  }

  async function getUploadChunks(file: File, md5: string): Promise<number[]> {
    // 全部文件块
    const chunks = getFileChunks(file.size)
    // 已上传的文件块索引
    const uploadChunks: number[] | FileItem = await getChunks({
      md5: md5,
      filename: file.name,
    })
    console.log(uploadChunks)
    // 秒传
    if (!Array.isArray(uploadChunks)) {
      fileList.value.push(uploadChunks)
      return []
    }
    return chunks.filter((chunk, index) => {
      return uploadChunks.indexOf(index) === -1
    })
  }

  function clickEvent() {
    fileRef.value.value = ''
    fileRef?.value.click()
  }

  async function uploadParallel(file: File, chunks: number[], md5: string) {
    const res = chunks.map((chunk: number, index) => {
      const formData = new FormData()
      formData.append('md5', md5)
      formData.append(
        'chunk',
        slice.call(
          file,
          (Math.ceil(chunks[index] / CHUNK_SIZE) - 1) * CHUNK_SIZE,
          chunks[index]
        )
      )
      formData.append('filename', file.name)
      formData.append(
        'index',
        String(Math.ceil((chunk - CHUNK_SIZE) / CHUNK_SIZE))
      )
      return uploadChunk(formData)
    })
    Promise.allSettled(res).then(() => {
      notifyCombine(file, md5)
    })
  }

  async function notifyCombine(file: File, md5: string) {
    const chunks = await getUploadChunks(file, md5)
    if (chunks.length === 0) {
      const res = await mergeChunk({
        md5: md5,
        filename: file.name,
      })
      fileList.value.push(res)
    } else {
      uploadParallel(file, chunks, md5)
    }
  }
  function getFileChunks(size: number) {
    const chunks = []
    const chunkCount = Math.ceil(size / CHUNK_SIZE)
    for (let i = 1; i < chunkCount; i++) {
      chunks.push(i * CHUNK_SIZE)
    }
    if (chunkCount) {
      chunks.push(size)
    }
    return chunks
  }

  function computedMD5(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const spark = new SparkMD5.ArrayBuffer()
      const reader = new FileReader()
      const chunks = getFileChunks(file.size)
      let currentChunk = 0
      reader.onload = (e: any) => {
        spark.append(e?.target?.result)
        currentChunk++
        if (currentChunk < chunks.length) {
          loadNext()
        } else {
          resolve(spark.end())
        }
      }
      reader.onerror = (error) => {
        console.error(error)
        reject('computed fail')
      }
      function loadNext() {
        const start =
          (Math.ceil(chunks[currentChunk] / CHUNK_SIZE) - 1) * CHUNK_SIZE
        const end = chunks[currentChunk]
        reader.readAsArrayBuffer(slice.call(file, start, end))
      }
      loadNext()
    })
  }

  async function download(filepath: string) {
    const res = await headDownload({
      filepath: filepath,
    })
    const length = res?.['content-length'] as number
    const name = getFileName(res?.['content-disposition'] as string)
    const chunks = getFileChunks(+length)
    retryDownload(filepath, name, chunks, [])
  }

  function retryDownload(
    downloadPath: string,
    filename: string,
    chunks: number[],
    result: Record<string, any>[]
  ) {
    const list = chunks.map((chunk, index) => {
      return downloadChunk(
        downloadPath,
        (Math.ceil(chunks[index] / CHUNK_SIZE) - 1) * CHUNK_SIZE,
        chunks[index]
      )
    })
    Promise.allSettled(list).then((res) => {
      // 下载完全
      const successList = res.filter((i, index) => {
        if (i.status === 'fulfilled') {
          result[Math.ceil((chunks[index] - CHUNK_SIZE) / CHUNK_SIZE)] = i
        }
        return i.status === 'fulfilled'
      })
      if (successList.length === list.length) {
        const buffers: Uint8Array[] = (result || []).map((i) => {
          return new Uint8Array(i?.value)
        })
        const res = mergeBlobChunk(buffers)
        if (res) {
          saveAs(filename, res)
        }
      } else {
        // 下载剩余块
        const failList = res.reduce((acc: number[], cur, index) => {
          if (cur.status === 'rejected') {
            acc.push(index)
          }
          return acc
        }, [])
        const list = chunks.filter((chunk, index) => {
          return failList.indexOf(index) !== -1
        })
        retryDownload(downloadPath, filename, list, result)
      }
    })
  }

  function getFileName(str: string) {
    str = decodeURIComponent(str?.split?.(';')?.[1])
    return str?.split('=')?.[1]
  }

  async function downloadChunk(filename: string, start: number, end: number) {
    const buffer = await downloadFile(
      {
        filepath: filename,
      },
      {
        headers: { range: `bytes=${start}-${end}` },
        responseType: 'arraybuffer',
      }
    )
    return buffer
  }
  function mergeBlobChunk(arrays: Uint8Array[]) {
    if (!arrays.length) return
    const totalLength = arrays.reduce((acc, value) => acc + value.length, 0)
    const result = new Uint8Array(totalLength)
    let length = 0
    for (const array of arrays) {
      result.set(array, length)
      length += array.length
    }
    return result
  }
</script>

<style lang="scss" scoped>
  .file {
    padding: 16px;

    &-list {
      display: flex;
      flex-direction: column;
      margin-top: 16px;

      & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        width: 70%;
      }

      & > div:hover {
        background: rgba($color: #000, $alpha: 30%);
      }
    }
  }
</style>
