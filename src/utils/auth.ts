/*
 * @Author: cola
 * @Date: 2022-07-24 14:01:09
 * @LastEditors: cola
 * @Description:
 */
import { useCookies } from '@vueuse/integrations/useCookies'
const TOKEN_KEY = 'token'
const REFRESH_KEY = 'refresh_token'

const { get, set, remove } = useCookies([TOKEN_KEY, REFRESH_KEY])
export function getToken(): string {
  return get(TOKEN_KEY)
}

export function setToken(value: string) {
  return set(TOKEN_KEY, value)
}

export function removeToken() {
  return remove(TOKEN_KEY)
}

export function getRefreshToken(): string {
  return get(REFRESH_KEY)
}

export function setRefreshToken() {
  return get(REFRESH_KEY)
}

export function removeRefreshToken() {
  return remove(REFRESH_KEY)
}
