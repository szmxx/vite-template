import { getRefreshToken, getToken, setToken } from '@/utils/auth'
import Http from '@/utils/Http'
import { AxiosError, AxiosInstance } from 'axios'
import { refreshToken } from './auth'

const errorHandler = async (error: AxiosError, ctx?: AxiosInstance) => {
  // !permission auth fail, but it's not refresh token request
  if (
    error?.response?.status === 401 &&
    !error?.config?.url?.includes?.('/auth/refreshToken')
  ) {
    const { config } = error
    try {
      const token = await refreshToken({
        token: getToken(),
        refreshToken: getRefreshToken(),
      })
      setToken(token)
      config.headers!['Authorization'] = `$token}`
      // continue auth
      return ctx?.(config)
    } catch (err) {
      const router = useRouter()
      router.push('/login')
      console.error('登录失效！')
      return Promise.reject(err)
    }
  }
  return Promise.reject(error)
}

interface InstanceMap {
  [key: string]: AxiosInstance | null
}

export interface AxiosConfig {
  BASEURL: {
    host: string
    port: number
    path?: string
  }
}
const instanceMap: InstanceMap = {
  base: null, // 当前系统ip下的请求
  origin: new Http({
    errorHandler,
  }).instance, // 完整的url请求
  business: null, // 后台接口请求
}

// 初始化默认实例
export const initAxiosInstance = (config: AxiosConfig) => {
  if (!config) return
  const {
    BASEURL: { host, port },
  } = config
  const BASEURL = `//${host || location.hostname}:${port}/`
  instanceMap.base = new Http({
    BASEURL: BASEURL,
    errorHandler,
  }).instance
  // set auth headers
  instanceMap.base.defaults.headers.common['Authorization'] = `${getToken()}`
}
// 初始化后台实例
export const initBusinessInstance = (config: AxiosConfig) => {
  if (!config) return
  const {
    BASEURL: { host, port, path },
  } = config
  const BASEURL = `//${host || location.hostname}:${port}/${path}`
  instanceMap.business = new Http({
    BASEURL: BASEURL,
    errorHandler,
  }).instance
}
// 基础get方法
const get = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = '未知服务',
  params = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: 'get',
      ...params,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res)
      })
      .catch((error) => {
        reject(error)
        console.error(`get请求---${serviceName}---接口失败！`)
      })
  })
}
// 基础post方法
const post = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = '未知服务',
  data = {},
  options = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: 'post',
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res)
      })
      .catch((error) => {
        reject(error)
        console.error(`post请求---${serviceName}---接口失败！`)
      })
  })
}
// 基础put方法
const put = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = '未知服务',
  data = {},
  options = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: 'put',
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res)
      })
      .catch((error) => {
        reject(error)
        console.error(`put请求---${serviceName}---接口失败！`)
      })
  })
}
// 基础delete方法
const del = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = '未知服务',
  data = {},
  options = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: 'delete',
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res)
      })
      .catch((error) => {
        reject(error)
        console.error(`delete请求---${serviceName}---接口失败！`)
      })
  })
}

export const GET = <T>(
  url: string,
  serviceName?: string,
  options?: Record<string, any>
): Promise<T> => {
  if (!instanceMap.base) {
    throw new Error('instanceMap.base is null')
  }
  return get<T>(instanceMap.base, url, serviceName, options)
}
export const POST = <T>(
  url: string,
  serviceName?: string,
  data?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  if (!instanceMap.base) {
    throw new Error('instanceMap.base is null')
  }
  return post<T>(instanceMap.base, url, serviceName, data, options)
}
export const PUT = <T>(
  url: string,
  serviceName?: string,
  data?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  if (!instanceMap.base) {
    throw new Error('instanceMap.base is null')
  }
  return put<T>(instanceMap.base, url, serviceName, data, options)
}
export const DELETE = <T>(
  url: string,
  serviceName?: string,
  data?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  if (!instanceMap.base) {
    throw new Error('instanceMap.base is null')
  }
  return del<T>(instanceMap.base, url, serviceName, data, options)
}

export const originGet = <T>(
  url: string,
  serviceName?: string,
  options?: Record<string, any>
): Promise<T> => {
  if (!instanceMap.origin) {
    throw new Error('instanceMap.origin is null')
  }
  return get<T>(instanceMap.origin, url, serviceName, options)
}

export const originPost = <T>(
  url: string,
  serviceName?: string,
  data?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  if (!instanceMap.origin) {
    throw new Error('instanceMap.origin is null')
  }
  return post<T>(instanceMap.origin, url, serviceName, data, options)
}
