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

export const DEFAULT_EVENT_CONFIG = {
  beforeCreate: function beforeCreate() {
    // code this
  },
  created: function created() {
    // code this
  },
  beforeMount: function beforeMount() {
    // code this
  },
  mounted: function mounted() {
    // code this
  },
  beforeDestroy: function beforeDestroy() {
    // code this
  },
  destroyed: function destroyed() {
    // code this
  },
}

export const DEFAULT_CONFIG_PANEL_STYLE = {
  size: 'small',
  disabled: false,
  readonly: false,
  'label-width': '',
  'label-position': '',
}

export const DEFAULT_GLOBAL_STYLE = {
  size: '',
  disabled: false,
  readonly: false,
  'label-width': '',
  'label-position': '',
}
