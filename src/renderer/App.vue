<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {loginStore} from '../tool/storage.js'
import {ipcToLogined,ipcToLogout} from '../tool/ipcRenderer.js'

export default {
  name: 'App',
  mounted(){
    // 未登录
    if(!loginStore.get("isLogin")){
      ipcToLogout().then(()=>{})
    }else{
      // 已登录
      ipcToLogined().then(()=>{})
    }

  }
}
</script>
<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
