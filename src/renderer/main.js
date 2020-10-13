import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import Bus from "@/services/bus";

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(ElementUI, { locale })

Vue.prototype.$bus = Bus;


Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

// window.onbeforeunload = (e) => {
//   console.log('I do not want to be closed');

//   // Unlike usual browsers that a message box will be prompted to users, returning
//   // a non-void value will silently cancel the close.
//   // It is recommended to use the dialog API to let the user confirm closing the
//   // application.
//   e.returnValue = false;
// };

// 生产环境
// const isDev = require("electron-is-dev");
// if (!isDev) {
// 	//禁止F12键盘事件
// 	document.addEventListener("keydown", function(event) {
// 		return 123 != event.keyCode || (event.returnValue = false);
// 	});
// 	//禁止右键、选择、复制
// 	// document.addEventListener("contextmenu", function(event) {
// 	// 	return (event.returnValue = false);
// 	// });

// 	// //禁用右键（防止右键查看源代码） 
//   // window.oncontextmenu=function(){return false;} 
//   // //禁止任何键盘敲击事件（防止F12和shift+ctrl+i调起开发者工具） 
//   // window.onkeydown = window.onkeyup = window.onkeypress = function () { 
//   // window.event.returnValue = false; 
//   //     return false; 
//   // } 
//   //如果用户在工具栏调起开发者工具，那么判断浏览器的可视高度和可视宽度是否有改变，如有改变则关闭本页面 
//   var h = window.innerHeight,w=window.innerWidth; 
//   window.onresize = function () { 
//       if (h!= window.innerHeight||w!=window.innerWidth){ 
//           window.close(); 
//           window.location = "about:blank"; 
//       } 
//   }
// }
