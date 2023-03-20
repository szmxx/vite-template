<!--
 * @Author: cola
 * @Date: 2023-03-20 18:07:30
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-form
    class="border-dashed min-h-4rem"
    droppable
    :model="formModel"
    inline
    @dragover="dragOver"
    @drop="dragEnd"
  >
    <el-form-item
      v-for="i in list"
      :key="i.id"
      :class="{ 'border border-blue': current === i.id }"
      @click.stop="clickHandler(i)"
    >
      <OperateTool
        v-show="current === i.id"
        class="absolute right-0 bottom-0"
        @remove="remove(list, i)"
        @copy="append(list, JSON.stringify(i))"
      ></OperateTool>
      <component :is="i.component"></component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { append, remove } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  const store = useStore()
  const formModel = reactive({})
  const list: IComponentPanelItemChild[] = reactive([])
  const current = computed(() => {
    return store.current
  })
  function dragOver(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'copy'
    }
  }

  function clickHandler(data: IComponentPanelItemChild) {
    if (data.id) {
      store.setCurrent(data.id)
    }
  }

  function dragEnd(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    const data = evt?.dataTransfer?.getData('text/plain')
    if (data) {
      append(list, data)
    }
  }
</script>

<style scoped lang="scss"></style>
