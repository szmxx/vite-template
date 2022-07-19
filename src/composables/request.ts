/*
 * @Author: cola
 * @Date: 2022-07-19 14:53:10
 * @LastEditors: cola
 * @Description: VueRequest 代替
 */
interface IOptions {
  cacheKey?: string
  retryCount?: number
  retryInterval?: number
  loadingDelay?: number
  minLoading?: number
}
export function useRequest(ajax: () => Promise<unknown>, options: IOptions) {
  const loading = ref(true)
  const data = ref()
  const error = ref()
  async function run() {
    try {
      data.value = await ajax()
    } catch {
      error.value = error
    } finally {
      loading.value = false
    }
  }
  run()
  return {
    loading,
    data,
    error,
  }
}
