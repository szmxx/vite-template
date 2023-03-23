<!--
 * @Author: cola
 * @Date: 2023-03-20 22:06:52
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div ref="codeEditBox" class="w-full h-full"></div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import * as monaco from 'monaco-editor'
  let editor: monaco.editor.IStandaloneCodeEditor
  const codeEditBox = ref()

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {},
    },
  })

  const emit = defineEmits(['update:modelValue', 'change', 'editor-mounted'])

  function init() {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    })

    editor = monaco.editor.create(codeEditBox.value, {
      value: props.modelValue,
      language: props.language,
      theme: props.theme,
      automaticLayout: true,
      readOnly: props.readonly,
      ...props.options,
    })
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue() //给父组件实时返回最新文本
      emit('update:modelValue', value)
      emit('change', value)
    })
    autoFormat()
    emit('editor-mounted', editor)
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      if (editor) {
        const value = editor.getValue()
        if (newVal !== value) {
          editor.setValue(newVal)
        }
      }
    }
  )

  watch(
    () => props.options,
    (newValue) => {
      editor.updateOptions(newValue)
    },
    { deep: true }
  )
  watch(
    () => props.language,
    (newValue) => {
      monaco.editor.setModelLanguage(editor.getModel()!, newValue)
    }
  )

  function autoFormat() {
    if (editor) {
      editor.trigger('anything', 'editor.action.formatDocument', {})
    }
  }

  function validate() {
    const res = monaco.editor.getModelMarkers({})
    return res.length <= 1
  }

  onMounted(() => {
    init()
  })
  onBeforeUnmount(() => {
    editor.dispose()
  })

  defineExpose({
    validate: validate,
  })
</script>
