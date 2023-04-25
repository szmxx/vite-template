/*
 * @Author: cola
 * @Date: 2022-11-16 16:16:42
 * @LastEditors: cola
 * @Description:
 */
export interface FileItem {
  filename: string
  downloadPath: string
}
import { BPOST, BGET, BHEAD } from './index'

export function uploadChunk(data = {}) {
  return BPOST('/uploadChunk', '上传分块文件', data)
}

export function getChunks(data = {}) {
  return BGET<number[] | FileItem>('/getChunks', '获取已上传的块', data)
}

export function mergeChunk(data = {}) {
  return BPOST<FileItem>('/mergeChunk', '合并分块文件', data)
}
export function downloadFile(data = {}, options = {}) {
  return BPOST('/downloadFile', '断点下载文件', data, options)
}
export function headDownload(data = {}) {
  return BHEAD<Record<string, unknown>>('/downloadFile', '查询文件信息', data)
}
