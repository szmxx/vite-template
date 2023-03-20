<template>
  <el-collapse v-model="activeNames" class="pb-16">
    <el-collapse-item
      v-for="item in list"
      :key="item.name"
      :name="item.name"
      :title="item.title"
    >
      <component
        :is="item.component"
        :ref="item.ref"
        :config="item.config"
      ></component>
    </el-collapse-item>
  </el-collapse>
  <div
    v-if="store.current"
    class="flex w-[20rem] items-center border-t-1 border-#eee justify-end fixed bottom-0 right-0 h-16 bg-white"
  >
    <el-button type="primary" class="mr-4" @click="saveHandler"
      >保存配置</el-button
    >
  </div>
</template>

<script setup lang="ts">
  import useStore from '@/store/lowcode'
  import FieldComponent from '../FieldComponent'
  const store = useStore()
  const basicRef = ref()
  const activeNames = ['basic']
  const list = reactive([
    {
      title: '基础属性',
      name: 'basic',
      component: FieldComponent,
      ref: 'basicRef',
      config: {},
    },
    {
      title: '样式属性',
      name: 'style',
      component: FieldComponent,
      ref: 'styleRef',
    },
    {
      title: '事件属性',
      name: 'event',
      component: FieldComponent,
      ref: 'eventRef',
    },
  ])
  const config = computed(() => {
    if (store.current) {
      return store.config[store.current] || {}
    }
    return {}
  })
  watch(config, (newVal) => {
    list[0].config = newVal
  })

  async function saveHandler() {
    const res = await basicRef?.value?.[0]?.submit?.()
    if (res) {
      store.setConfig(store.current, res.value || res)
    }
  }
</script>
