<!--
 * @Author: cola
 * @Date: 2023-03-20 10:26:23
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div droppable @dragover="dragOver" @drop="dragEnd">
    <vuedraggable :list="list" item-key="id" handle=".handle">
      <template #item="{element}">
        <div @click="selectHandler(element)" class="relative w-full" :class="{'border border-blue': current === element.id}">
          <MoveTool class="absolute" v-show="current === element.id" :title="element.title"></MoveTool>
          <OperateTool class="absolute right-0 bottom-0" v-show="current === element.id" @remove="remove(element)" @copy="append(JSON.stringify(element))"></OperateTool>
          <component :is="element.component"></component>
        </div>
      </template>
    </vuedraggable>
  </div>
</template>

<script setup lang="ts">
import vuedraggable from "vuedraggable"
import { uniqueId } from 'lodash'
import OperateTool from './components/OperateTool.vue'
import MoveTool from './components/MoveTool.vue'
import { IComponentPanelItemChild } from '../types'
import useStore from '@/store/lowcode'
const store = useStore()
const list: IComponentPanelItemChild[] = reactive([])
const current = computed(()=>{
  return store.current
})

watch(list, (newVal) => {
  console.log(newVal);
})
function dragOver(evt: DragEvent){
  evt.preventDefault();
  if(evt.dataTransfer){
    evt.dataTransfer.dropEffect = "copy";
  }
}

function dragEnd(evt: DragEvent){
  evt.preventDefault();
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

function selectHandler(element) {
  store.setCurrent(element.id)
}
</script>

<style scoped lang="scss">

</style>
