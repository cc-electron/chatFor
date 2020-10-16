<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// const {remote} = require('electron');

export default {
  name: 'App',
  mounted(){
    console.log(this.$electron,'electron')

    const {remote} = this.$electron
    const {Menu, MenuItem} = remote;
    //右键菜单
    const menu = new Menu();
    menu.append(new MenuItem({
        label: '放大',
        click:function ()  {
            console.log('item 1 clicked')
        }
    }));
    menu.append(new MenuItem({type: 'separator'}));//分割线
    menu.append(new MenuItem({label: '缩小', type: 'checkbox', checked: true}));//选中

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
