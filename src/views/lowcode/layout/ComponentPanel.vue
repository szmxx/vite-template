<!--
 * @Author: cola
 * @Date: 2023-03-20 10:26:09
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="bg-white">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="item in list" :title="item.title" :name="item.name">
        <div draggable="true" @dragstart="dragStart($event, i)" v-for="i in item.list" class="flex items-center py-1 w-[calc(50%-8px)] bg-#eee border-dashed">
          <div :class="i.icon" class="pl-4"></div>
          <div>{{ i.title }}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { IComponentPanelItem, IComponentPanelItemChild } from '../types'
const activeNames:string[] = []

const list: IComponentPanelItem[] = [
  {
    title: '容器',
    name: 'container',
    list: [{
      title: "栅格",
      component: "GridContainer",
      icon: 'i-carbon-grid'
    },{
      title: "flex",
      component: "FlexContainer",
      icon: 'i-mdi-format-text-wrapping-overflow'
    }, {
      title: "表格",
      component: "TableContainer",
      icon: 'i-mdi-table-large'
    }, {
      title: "标签页",
      component: "TabContainer",
      icon: 'i-mdi-tab'
    }, {
      title: "卡片",
      component: "CardContainer",
      icon: 'i-mdi-cards'
    }, {
      title: "表单",
      component: "FormContainer",
      icon: 'i-mdi-form-select'
    }]
  },
  {
    title: '基础组件',
    name: 'component',
    list: [{
      title: "单行输入",
      component: "CommonInput",
      icon: 'i-iconoir-input-field'
    }, {
      title: "多行输入",
      component: "CommonInput",
      icon: 'i-mdi-text'
    }, {
      title: "计数器",
      component: "CommonInputNumber",
      icon: 'i-carbon-character-whole-number'
    }, {
      title: "单选项",
      component: "CommonRadio",
      icon: 'i-carbon-radio-button-checked'
    }, {
      title: "多选项",
      component: "CommonCheck",
      icon: 'i-carbon-checkbox-checked-filled'
    }, {
      title: "下拉选项",
      component: "CommonDropdown",
      icon: 'i-mdi-list-status'
    }, {
      title: "下拉选择器",
      component: "CommonSelect",
      icon: 'i-mdi-format-list-checks'
    }, {
      title: "时间",
      component: "CommonTimePicker",
      icon: 'i-iconoir-clock'
    }, {
      title: "时间范围",
      component: "CommonTimePicker",
      icon: 'i-carbon-calculator-check'
    }, {
      title: "日期",
      component: "CommonDatePicker",
      icon: 'i-mdi-calendar-month'
    }, {
      title: "日期范围",
      component: "CommonDatePicker",
      icon: 'i-mdi-calendar-range'
    }, {
      title: "开关",
      component: "CommonSwitch",
      icon: 'i-mdi-toggle-switch-off-outline'
    }, {
      title: "评分",
      component: "CommonRate",
      icon: 'i-carbon-star'
    }, {
      title: "颜色",
      component: "CommonColorPicker",
      icon: 'i-carbon-color-palette'
    }, {
      title: "滑块",
      component: "CommonSlider",
      icon: 'i-iconoir-control-slider'
    }, {
      title: "静态文字",
      component: "CommonText",
      icon: 'i-mdi-format-text'
    }, {
      title: "按钮",
      component: "CommonButton",
      icon: 'i-mdi-gesture-tap-button'
    }, {
      title: "图标",
      component: "CommonIcon",
      icon: 'i-mdi-emoticon-outline'
    }, {
      title: "分割线",
      component: "CommonDivider",
      icon: 'i-iconoir-divide-selection-2'
    }, {
      title: "图片",
      component: "CommonImage",
      icon: 'i-carbon-image'
    }, {
      title: "文件上传",
      component: "CommonUpload",
      icon: 'i-carbon-document'
    }, {
      title: "富文本",
      component: "rich",
      icon: 'i-carbon-ibm-cloud-direct-link-1-dedicated-hosting'
    }, {
      title: "级联选择器",
      component: "CommonCascader",
      icon: 'i-mdi-sort-reverse-variant'
    }, {
      title: "链接",
      component: "CommonLink",
      icon: 'i-mdi-attachment'
    }]
  },
  {
    title: '定制组件',
    name: 'vip',
    list: []
  }
]

function handleChange(){

}

function dragStart(evt: DragEvent, data: IComponentPanelItemChild){
  if(evt.dataTransfer){
    evt.dataTransfer.effectAllowed = "copy";
    evt.dataTransfer.setData("text/plain", JSON.stringify(data));
  }
}
</script>

<style scoped lang="scss">
:deep(.el-collapse-item__header){
  padding-left: 8px;
}

:deep(.el-collapse-item__header.is-active){
  border-bottom: 1px solid var(--el-collapse-border-color);
}

:deep(.el-collapse-item__content){
  display: flex;
  padding: 8px;
  flex-wrap: wrap;
  gap: 8px
}
</style>
