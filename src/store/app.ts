import { defineStore } from 'pinia'
export default defineStore('app', {
  state: () => {
    return {
      _config: {},
    }
  },
  getters: {
    config: (state) => state._config,
  },
  actions: {
    setConfig(config: Record<string, unknown>) {
      this._config = config
    },
  },
})
