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
    <div v-show="prefix" class="bg-#eee mb-1 px-2 border-rounded-1">
      {{ prefix }}
    </div>
    <CommonCodeEditor
      ref="codeRef"
      v-model="code"
      class="min-h-20rem"
      :language="language"
    ></CommonCodeEditor>
    <div v-show="suffix" class="bg-#eee mb-1 px-2 border-rounded-1">
      {{ suffix }}
    </div>
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
  import parse from 'style-to-js'
  const code = ref('')
  const codeRef = ref()
  const language = ref('javascript')
  const dialogVisible = ref(false)
  const props = defineProps({
    __type__: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [Object, Array],
      default: () => {},
    },
  })
  watch(
    () => props.__type__,
    (newVal) => {
      if (['style', 'body-style'].includes(newVal)) {
        language.value = 'css'
      } else {
        language.value = 'javascript'
      }
    },
    {
      immediate: true,
    }
  )
  const emit = defineEmits(['update:modelValue'])
  function saveHandler() {
    const bool = codeRef?.value?.validate?.()
    try {
      if (bool) {
        if (language.value === 'css') {
          const value = parse(
            code.value.replace(/style\s+{/, '').replace('}', '')
          )
          emit('update:modelValue', value)
        } else {
          const value = toObject(code.value)
          emit('update:modelValue', value)
        }
        hide()
      }
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
    // 特殊处理 css
    if (language.value === 'css') {
      code.value =
        'style ' + code.value.replaceAll('"', '').replaceAll(',', ';')
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
