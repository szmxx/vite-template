<!--
 * @Author: cola
 * @Date: 2022-12-21 11:00:00
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="border border-lighter">
    <Toolbar
      class="border-b border-lighter"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      class="overflow-y-hidden"
      :style="style"
      :default-config="editorConfig"
      :mode="mode"
      @on-change="changeFn"
      @on-created="createFn"
    />
  </div>
</template>

<script lang="ts" setup>
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { PropType } from 'vue'
  import { IToolbarConfig } from '@wangeditor/editor'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

  const props = defineProps({
    mode: {
      type: String,
      default: 'default',
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入内容...',
    },
    height: {
      type: [Number, String],
      default: 300,
    },
    toolbarConfig: {
      type: Object as PropType<IToolbarConfig>,
      default: () => {
        return {
          excludeKeys: [
            'group-image',
            'group-video',
            'insertVideo',
            'codeBlock',
            'fullScreen',
          ],
        }
      },
    },
  })
  const style = computed(() => {
    return {
      height:
        typeof props.height === 'number' ? props.height + 'px' : props.height,
    }
  })
  const emit = defineEmits(['update:modelValue'])
  defineExpose({
    clear: clear,
  })
  // editor ref
  const editorRef = shallowRef()
  // 内容 HTML
  const valueHtml = ref(props.modelValue)

  const editorConfig = { placeholder: props.placeholder }

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  const changeFn = useDebounceFn(debounceChange, 500)
  function debounceChange() {
    const res = editorRef.value.getHtml()
    if (res !== '<p><br></p>') {
      emit('update:modelValue', res.replace(/^<p>(.*)<\/p>$/, '$1'))
    } else {
      emit('update:modelValue', '')
    }
  }
  function createFn(editor: unknown) {
    editorRef.value = editor
  }
  function clear() {
    valueHtml.value = ''
  }
</script>
