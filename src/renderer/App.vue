<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// const {remote} = require('electron');
import { removeToken } from '@/utils/auth';
import {loginStore} from '../tool/storage.js'

export default {
  name: 'App',
  mounted(){
    console.log(this.$electron,'electron')
    let electron = this.$electron
    const {remote} = this.$electron
    const {Menu, MenuItem} = remote;
    const menu = new Menu();
    //右键菜单
    // menu.append(new MenuItem({
    //     label: '放大',
    //     click:function ()  {
    //         console.log('item 1 clicked')
    //     }
    // }));
    // menu.append(new MenuItem({type: 'separator'}));//分割线
    // menu.append(new MenuItem({label: '缩小', type: 'checkbox', checked: true}));//选中
    let MenuList = [
        {
            label: '放大',
            click: () => {
                console.log('item 1 clicked')
            }
        },
        {
          label: '退出',
          click: () => {
            loginStore.set("isLogin",false)
            removeToken()
            window.location.reload()
            electron.ipcRenderer.send('logout')
          }
        },
        {type: 'separator'},
        {label: '缩小', type: 'checkbox', checked: true},
    ]
    MenuList.map(v=> {
        v = new MenuItem(v)
        menu.append(v)
    })
    

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        menu.popup({window: remote.getCurrentWindow()})
    }, false)



  }
}
</script>
<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
