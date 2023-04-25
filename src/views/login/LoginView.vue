<!--
 * @Author: cola
 * @Date: 2022-12-01 10:19:51
 * @LastEditors: cola
 * @Description: 交互和趣味性
-->
<template>
  <div class="w-full h-full flex">
    <div class="flex-1 h-full">
      <img class="w-full h-full" src="@/assets/img/login.JPG" />
    </div>
    <div class="w-[30%]">
      <div class="flex center h-full">
        <el-form :model="formModel" class="flex flex-col center flex-wrap">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="formModel.username" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="formModel.password" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item prop="submit">
            <el-button @click="submit">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-drag class="float-btn color-white absolute w-10 h-10 bg-blue flex center border-rounded-50% cursor-move">
      工具
    </div>
  </div>
</template>

<script setup lang="ts">
import { login, auth } from "@/api/auth"
import { setRefreshToken, setToken } from "@/utils/auth"
const route = useRoute()
const router = useRouter()

let formModel = reactive({
  username: '',
  password: ''
})
async function submit(){
  const { username, password } = formModel
  const res = await login({
    username: username,
    password: password
  })
  const { redirect = '' } = route.query || {}
  if(res) {
    if(redirect){
      redirectUrl(res.code)
    } else {
      const { token, refreshToken } = await auth({
        code: res.code
      })
      setToken(token)
      setRefreshToken(refreshToken)
      router.push({
        path: '/'
      })
    }
  }
}

function redirectUrl(code: string){
  const { redirect = '' } = route.query || {}
  if(redirect) {
    const url = new URL(redirect as string)
    url.searchParams.append("code", code)
    window.location.href = url.toString()
  }
}

function reset(){
  formModel = reactive({
    username: '',
    password: ''
  })
}
</script>

<style lang="scss">
  .float-btn {
    transform: translate(calc(100vw - 4rem), calc(100vh - 4rem));
  }
</style>
