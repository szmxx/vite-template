/*
 * @Author: cola
 * @Date: 2022-07-05 15:19:23
 * @LastEditors: cola
 * @Description:
 */
import Http from '@/utils/Http'
import { App } from 'vue'

export default (app: App) => {
  app.config.globalProperties.$http = Http
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$loading = ElLoading.service
  app.config.globalProperties.$prompt =
    app.config.globalProperties.$confirm =
    app.config.globalProperties.$alert =
    app.config.globalProperties.$msgbox =
    app.config.globalProperties.$messageBox =
      ElMessageBox
}
