import { AppConfig } from '@/api/public'
import { defineStore } from 'pinia'
export default defineStore('app', {
  state: () => {
    return {
      _config: {} as AppConfig,
    }
  },
  getters: {
    config: (state) => state._config,
  },
  actions: {
    setConfig(config: AppConfig) {
      this._config = config
    },
  },
})
