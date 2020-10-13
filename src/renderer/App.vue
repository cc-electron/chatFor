<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {loginStore} from '../tool/storage.js'
// console.log(loginStore,'isLogin')
// import {ipcTowCenter,ipcToResize,ipcToLogined,ipcToLogout} from '../tool/ipcRenderer.js'

export default {
  name: 'App',
  mounted(){
    console.log(loginStore,'loginStore')
    console.log(loginStore.get("isLogin"),'isLogins')
    // console.log(localStorage.getItem("isLogin"),'loginnnnnn')
    // 只有用户真正退出 才能设置 isLogin为false
    
    var winWidth = 0;
    var winHeight = 0;
    findDimensions()
    // let {width,height} = getViewport();

    console.log('窗口宽高',winWidth,winHeight)
    let width = screen.width
    // loginStore.get("width");
    let height = screen.height
    // loginStore.get("height");
    console.log('屏幕宽高',width,height)

    // 不走外部electron设置情况下设置窗口
    // 未登录
    if(!loginStore.get("isLogin")){
      
      window.resizeTo(470,800);
      let x = (width - winWidth)/2
      let y = (height - winHeight)/2
      // alert(`'yyyy: ',y,${winHeight},${height}`)
      // alert(`'xxxx: ',x,${winWidth},${width}`)
      window.moveTo(x,y)

      // wCenter()
      
    }else{
      // 已登录
      let x =  (width - 1000)/2
      let y = (height - 700)/2
      window.moveTo(x,y)
      console.log(x,y,'xxxxxxx22222')
      window.resizeTo(1000,700);

      
    }
    

    this.$bus.$on('winCenter',(xs,ys)=>{
      let x = (width - xs)/2
      let y = (height - ys)/2
      window.moveTo(x,y)
      console.log(x,y,'yyyyy')
    })
    
    
    let wCenter = () => {
        let x = (width - winWidth)/2
        let y = (height - winHeight)/2
        window.moveTo(x,y)
    }

    function findDimensions(){
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
      {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
      }
      return {
        'width': winHeight,
        'height': winWidth
      };
    }
    
    


    

    

  }
}
</script>
<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
