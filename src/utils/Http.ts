/*
 * @Author: weicong
 * @LastEditors: cola
 * @Description:
 * @Date: 2021-12-12 22:03:11
 * @LastEditTime: 2022-11-30 17:30:54
 * @FilePath: \vite-project\src\utils\Http.js
 */
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from 'axios'
const CancelToken = axios.CancelToken
interface HttpParams {
  BASEURL?: string
  TIMEOUT?: number
  errorHandler?: (error: AxiosError, ctx?: AxiosInstance) => void
  isCancel?: boolean
}
const cancelMap = new Map()
export default class Http {
  instance: AxiosInstance
  constructor({
    BASEURL,
    TIMEOUT = 1000 * 60 * 10,
    errorHandler = () => void 0,
    isCancel = true,
  }: HttpParams) {
    this.instance = axios.create({
      baseURL: BASEURL,
      timeout: TIMEOUT,
      withCredentials: true,
    })
    // 拦截请求
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (isCancel) {
          const key = uniqueKey(config)
          // if exists, abort it
          cancelHandler(key)
          if (!config.cancelToken && key) {
            config.cancelToken = new CancelToken((cancel) => {
              cancelMap.set(key, cancel)
            })
          }
        }
        return config
      },
      (error: AxiosError) => {
        if (!axios.isCancel(error)) {
          errorHandler(error, this.instance)
          return Promise.reject(error)
        }
      }
    )
    // 拦截响应
    this.instance.interceptors.response.use(
      ({ config, data, headers }: AxiosResponse) => {
        if (isCancel) {
          const key = uniqueKey(config)
          if (cancelMap.has(key)) {
            cancelMap.delete(key)
          }
        }
        if (config.method === 'head') {
          return Promise.resolve(headers)
        }
        return Promise.resolve(data)
      },
      (error: AxiosError) => {
        if (!axios.isCancel(error)) {
          errorHandler(error, this.instance)
          return Promise.reject(error)
        }
      }
    )
  }
  static async get(url: string, config?: AxiosRequestConfig) {
    return (await axios.get(url, config))?.data
  }
  static async post(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    return (await axios.post(url, data, config))?.data
  }

  static cancel(config: AxiosRequestConfig) {
    const key = uniqueKey(config)
    cancelHandler(key)
  }
}
function obj2Str(obj: Record<string, unknown>) {
  let res = ''
  if (typeof obj !== 'object') {
    return res
  }
  try {
    res = JSON.stringify(obj)
  } catch {
    res = ''
  }
  return res
}
function uniqueKey(config: AxiosRequestConfig) {
  const bool = whiteList(config)
  return bool
    ? ''
    : `${config.method}-${config.url}-${obj2Str(config.params)}-${obj2Str(
        config.data
      )}`
}
function cancelHandler(key: string) {
  if (key) {
    const cancel = cancelMap.get(key)
    if (cancel) {
      cancel()
      cancelMap.delete(key)
    }
  }
}

function whiteList(config: AxiosRequestConfig) {
  const { data, headers = {} } = config
  if (data instanceof FormData || headers.range) {
    return true
  }
  return false
}
