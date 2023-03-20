<!--
 * @Author: cola
 * @Date: 2023-03-20 18:07:30
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-form class="border-dashed min-h-4rem" droppable @dragover="dragOver" @drop="dragEnd" :model="formModel">
    <el-form-item v-for="i in list" :key="i.id" @click.stop="clickHandler(i)">
      <component :is="i.component"></component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { uniqueId } from 'lodash'
  import { IComponentPanelItemChild } from '../../types'
  import useStore from '@/store/lowcode'
  const store = useStore()
  const formModel = reactive({})
  const list:IComponentPanelItemChild[] = reactive([])

  function dragOver(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    if(evt.dataTransfer){
      evt.dataTransfer.dropEffect = "copy";
    }
  }

  function clickHandler(data) {
    store.setCurrent(data.id)
  }

  function dragEnd(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    let data = evt?.dataTransfer?.getData("text/plain");
    append(data)
  }

  function append(data: IComponentPanelItemChild) {
    try {
      data = JSON.parse(data)
      if(data && typeof data === 'object'){
        data.id = uniqueId()
        list.push(data)
      }
    } catch {
      console.log()
    }
  }
  function remove(data: IComponentPanelItemChild) {
    const index = list.findIndex(item=>{
      return item.id === data.id
    })
    if(index !== -1){
      list.splice(index, 1)
    }
  }
</script>

<style scoped lang="scss">

</style>
