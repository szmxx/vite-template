<!--
 * @Author: cola
 * @Date: 2023-03-21 10:52:18
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="flex items-center gap-x-1 cursor-pointer" @click="show">
    <i i-mdi-cog-outline></i>
    <span>配置数据</span>
  </div>
  <el-dialog v-model="dialogVisible" title="配置数据">
    <div v-show="label" class="bg-#eee mb-1 px-2 border-rounded-1">
      {{ label }} =
    </div>
    <CommonCodeEditor
      v-model="code"
      class="min-h-20rem"
      :language="language"
    ></CommonCodeEditor>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="saveHandler"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { toRawType } from '@/utils'

  const code = ref('')
  const language = ref('javascript')
  const dialogVisible = ref(false)
  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [Object, Array],
      default: () => {},
    },
  })
  const emit = defineEmits(['update:modelValue'])
  function saveHandler() {
    try {
      const value = toObject(code.value)
      emit('update:modelValue', value)
      hide()
    } catch (error) {
      console.error(error)
    }
  }

  function toObject(code: string) {
    return new Function(`return ${code}`)()
  }

  function show() {
    const type = toRawType(props.modelValue)
    if (type === 'Function') {
      code.value = props.modelValue.toString()
    } else {
      code.value = JSON.stringify(props.modelValue, null, 2)
    }
    dialogVisible.value = true
  }

  function hide() {
    dialogVisible.value = false
  }
</script>

<style scoped lang="scss">
  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-dialog__body) {
    padding: 8px;
  }
</style>
