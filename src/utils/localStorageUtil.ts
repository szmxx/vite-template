/*
 * @Author: cola
 * @Date: 2022-03-25 14:58:12
 * @LastEditors: cola
 * @Description: localStorage 二次封装
 */

const memoryStorage = {
  cache: Object.create(null),
  getItem(key: string) {
    if (this.cache[key] !== void 0) {
      return this.cache[key]
    }
    return null
  },
  setItem(key: string, value: unknown) {
    this.cache[key] = value
  },
  removeItem(key: string) {
    delete this.cache[key]
  },
  clear() {
    this.cache = Object.create(null)
  },
}

function getItem(key: string) {
  let res = null
  try {
    res = localStorage.getItem(key)
    if (!res) {
      res = memoryStorage.getItem(key)
    }
  } catch (error) {
    res = memoryStorage.getItem(key)
  }
  if (typeof res === 'string') {
    res = JSON.parse(res)
  }
  if (res?.expires && res?.start_time) {
    const end_time = new Date().getTime()
    if (end_time - res.start_time > +res.expires) {
      removeItem(key)
      return null
    }
  }
  if (res?.__reset__) {
    res = res.value
  }
  return res
}
function setItem(key: string, value: unknown, expires = 0) {
  let obj: Record<string, unknown>
  if (typeof value !== 'object') {
    obj = {
      value: value,
      __reset__: true,
    }
  } else {
    obj = value as Record<string, unknown>
  }
  if (expires) {
    obj.start_time = new Date().getTime()
    obj.expires = expires
  }
  try {
    localStorage.setItem(key, obj_2_str(obj))
  } catch (error) {
    memoryStorage.setItem(key, obj_2_str(obj))
  }
}
function removeItem(key: string) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`localStorage remove ${key} fail`)
  } finally {
    memoryStorage.removeItem(key)
  }
}
function clear() {
  localStorage.clear()
  memoryStorage.clear()
}

function obj_2_str(obj: Record<string, unknown>): string {
  let res = ''
  if (typeof obj !== 'object') {
    return res
  }
  try {
    res = JSON.stringify(obj)
  } catch (error) {
    console.error(error)
  }
  return res
}
export default {
  getItem,
  setItem,
  removeItem,
  clear,
}
