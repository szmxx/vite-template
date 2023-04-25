/*
 * @Author: cola
 * @Date: 2022-07-05 16:08:59
 * @LastEditors: cola
 * @Description:
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('demo', () => {
  const msg = ref('hello world')
  function greet() {
    console.log(msg.value)
  }
  return {
    msg,
    greet,
  }
})
