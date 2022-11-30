<template>
  <el-tree
    class="editor-tree"
    show-checkbox
    node-key="id"
    :data="treeData"
    :props="props"
    :default-expanded-keys="expandKeys"
    :expand-on-click-node="false"
    :height="208"
    @node-click="nodeClickHandler"
  >
    <template #default="{ node, data }">
      <div class="flex relative w-full justify-between">
        <div>
          <el-input
            v-if="data.isEdit"
            v-focus
            :model-value="data.label"
            @input="inputHandler($event, data)"
            @click.stop="void 0"
            @blur="blurHandler(data)"
          ></el-input>
          <span v-else>{{ data.label }}</span>
        </div>
        <div
          class="flex gap-column-2 items-center pr-2"
          @click.stop="operateHandler($event, node)"
        >
          <el-button
            v-for="(i, index) in operates"
            :key="index"
            size="small"
            :type="i.type"
            :data-type="i.label"
          >
            <i :data-type="i.label" :class="i.icon" />
          </el-button>
        </div>
      </div>
    </template>
  </el-tree>
</template>

<script setup lang="ts">
  import { TreeNode } from 'element-plus'
  import { uniqueId } from 'lodash'
  import { PropType, Ref } from 'vue'
  import { TreeItem } from '../types'
  defineProps({
    data: {
      type: Array as PropType<TreeItem[]>,
      default: () => [],
    },
  })
  let uid = 0
  function defaultNode(): TreeItem {
    return {
      id: uniqueId(),
      label: '节点' + uid++,
      children: [],
    }
  }
  const emit = defineEmits(['node-click'])
  const treeData: Ref<TreeItem[]> = ref([
    {
      id: '1',
      label: 'node1',
      meta: {
        a: 1,
        b: '1',
      },
    },
    {
      id: '2',
      label: 'node2',
      children: [
        {
          id: '22',
          label: 'node22',
          meta: {
            b: 1,
            c: 'hello ',
            list: [1, 2, 3],
            obj: {
              aa: '1',
            },
            bool: true,
          },
        },
      ],
    },
  ])
  const expandKeys: string[] = []
  dealData(treeData.value)
  function dealData(data: TreeItem[]) {
    data.map((i) => {
      i.isEdit = false
      i.expanded = true
      if (i.children?.length) {
        dealData(i.children)
      }
      if (i.expanded) {
        expandKeys.push(i.id)
      }
    })
  }
  const props = {
    value: 'id',
    label: 'label',
    children: 'children',
  }
  const operates = [
    {
      label: 'add',
      icon: 'i-carbon-add-alt',
      type: 'primary',
    },
    {
      label: 'remove',
      icon: 'i-mdi-delete',
      type: 'danger',
    },
    {
      label: 'edit',
      icon: 'i-mdi-file-document-edit',
      type: 'info',
    },
  ]

  function nodeClickHandler(data: TreeItem, node: TreeNode) {
    emit('node-click', data, node)
  }
  function operateHandler(evt: Event, node: any) {
    const type = (evt?.target as HTMLElement)?.dataset?.type
    switch (type) {
      case 'add':
        // 自动展开
        node.expanded = true
        if (!Array.isArray(node.data?.children)) {
          node.data.children = []
        }
        node.data.children.push(defaultNode())
        break
      case 'remove':
        if (node.parent) {
          const children: TreeItem[] =
            node?.parent?.data?.children || node?.parent?.data
          const index = children?.findIndex((i: TreeItem) => {
            return i.id === node.data.id
          })
          if (index !== -1) {
            children?.splice?.(index, 1)
          }
        }
        break
      case 'edit':
        node.data.isEdit = true
        break
    }
  }
  function inputHandler(value: string, data: TreeItem) {
    data.label = value
  }
  function blurHandler(data: TreeItem) {
    data.isEdit = false
  }
</script>

<style lang="scss" scoped>
  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-tree-node__label) {
    flex: 1;
  }
  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-tree-node__content) {
    height: 40px;
  }
</style>
