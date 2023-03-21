/*
 * @Author: cola
 * @Date: 2023-03-21 14:55:14
 * @LastEditors: cola
 * @Description:
 */
export const DEFAULT_STYLE_CONFIG = {
  style: {},
  class: '',
}

export const DEFAULT_STYLE_KEYS = Object.keys(DEFAULT_STYLE_CONFIG)

export const DEFAULT_EVENT_CONFIG = {
  'vue:mounted': function mounted() {},
}

export const DEFAULT_EVENT_KEYS = Object.keys(DEFAULT_EVENT_CONFIG)
