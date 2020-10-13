import {
  app,
  BrowserWindow,
  BrowserView,
  globalShortcut,
  dialog,
  Menu,
  ipcMain,
  screen
} from "electron";
const isDev = require("electron-is-dev");
const menuTemplate = require('./menu')
const Store = require('electron-store')
import {loginStore} from '../tool/storage'
import ipcMainFun from '../tool/ipcMain'
import {newWindow} from './AppWindow'



// const windowStateKeeper = require('electron-window-state');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}


let mainWindow,loginWindow
let MAINURL = 'http://localhost:9080'
const winURL = process.env.NODE_ENV === 'development'
  ? MAINURL
  : `file://${__dirname}/index.html`
// let win;

  
  
function createWindow() {
  // 设置原生应用菜单
  let menu = Menu.buildFromTemplate(menuTemplate.template)
  Menu.setApplicationMenu(menu)
  /**
   * Initial window options
   */
  // BrowserWindow.removeDevToolsExtension("Console");
  // BrowserWindow.removeDevToolsExtension("console");

  // 保持窗口大小固定
  // let mainWindowState = windowStateKeeper({
  //   defaultWidth: 1000,
  //   defaultHeight: 800
  // });
  // width: 470,
  // height: 800,

  mainWindow = new BrowserWindow({
    // 'x': mainWindowState.x,
    // 'y': mainWindowState.y,
    // 'width': mainWindowState.width,
    // 'height': mainWindowState.height,
    // width: 470,
    // height: 800,
    width: 1000,
    height: 700,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true, // 添加这一配置
		},
    devTools: false,
    show: true
  });
  // mainWindow.setResizable(false) // 用户是否可以手动调整窗口大小。

  // mainWindow.setTitle('超信')
  // mainWindow.getNormalBounds()

  mainWindow.loadURL(winURL);
  // let installed = BrowserWindow.getDevToolsExtensions()
  // console.log(installed);

  const view = new BrowserView();
  mainWindow.on('resize', ()=>{
    // console.log('resizezzzzz')
    
  })
  // 
  // console.log('关闭主窗口')
  mainWindow.on('close', (event) => {
      // event.preventDefault();
  });
  // console.log('关闭主窗口')
  mainWindow.on('closed', () => {
    loginWindow = null;
    mainWindow = null
  })

  // 生产环境
  // if (!isDev) {
  //   mainWindow.webContents.closeDevTools();
  //   // 快捷键禁用打开控制台
  //   globalShortcut.register("CommandOrControl+Shift+I", () => {
  //     // let focusWin = BrowserWindow.getFocusedWindow()
  //     // focusWin && focusWin.toggleDevTools()
  //     console.log("globalShortcut");
  //   });
  //   globalShortcut.register("CommandOrControl+Option+I", () => {
  //     // let focusWin = BrowserWindow.getFocusedWindow()
  //     // focusWin && focusWin.toggleDevTools()
  //     console.log("tiaoshi2");
  //   });
  // }
  // createLoginWins()
  console.log('23333为了居中之前')
  ipcMainFun(mainWindow,loginWindow)
  
  
  // console.log('每次重新打开也是走的这里')
  console.log('23333333！每次重新打开也是走的这里')
  // 崩溃重启
  // reLive(mainWindow);

  // let size = screen.getPrimaryDisplay().workAreaSize
  // let width = parseInt(size.width * 1)
  // let height = parseInt(size.height * 1)
  // loginStore.set("width",width)
  // loginStore.set("height",height)
  
  // console.log('屏幕宽高',width,height)
  // if(loginStore.get("isLogin")){
  //   loginWindow.setSize(1000, 700)
  //   loginWindow.center()
  // }else{
  //   loginWindow.setSize(470, 800)
  //   loginWindow.center()
  // }

  console.log('23333居中',loginStore.get("isLogin"))
  if(loginStore.get("isLogin")){
    mainWindow.setSize(1000, 700)
    mainWindow.center()
    mainWindow.setResizable(true)
  }else{
    mainWindow.setSize(470, 800)
    mainWindow.center()
    mainWindow.setResizable(false)
    console.log('23333为了居中')
  }

}


//...
// 第二个实例打开时执行的程序
app.on('second-instance', (event, argv) => {
  dialog.showMessageBox({
    title: "second",
    message: "second:" + argv.join(""),
  });
  console.log('argv: ',argv)
});
app.on('ready', createWindow)

app.on('before-quit',()=>{
  console.log('强制退出前！！！')
})
app.on('quit',()=>{
  console.log('强制退出前！！！')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('强制退出！！！')
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


// 崩溃重启
function reLive(mainWindowS){
  // const mainWindowS = BrowserWindow.fromId(global.mainId);
  mainWindowS.webContents.on('crashed', () => {
    const options = {
        type: 'error',
        title: '进程崩溃了',
        message: '这个进程已经崩溃.',
        buttons: ['重载', '退出'],
      };    
    recordCrash().then(() => {
        dialog.showMessageBox(options, (index) => {
          if (index === 0) reloadWindow(mainWindowS);
          else app.quit();
        });
      }).catch((e) => {
        console.log('err', e);
      });
  })

  function recordCrash() { 
      return new Promise(resolve => { 
        // 崩溃日志请求成功.... 
        resolve();
      })
  }
    
  function reloadWindow(mainWin) {
    if (mainWin.isDestroyed()) {
      app.relaunch();
      app.exit(0);
    } else {
      BrowserWindow.getAllWindows().forEach((w) => {
        if (w.id !== mainWin.id) w.destroy();
      });
      mainWin.reload();
    }
  }
}



/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

 let createLoginWins = () => {

      Menu.setApplicationMenu(null) // 关闭子窗口菜单栏
      const modalPath = process.env.NODE_ENV === 'development'
        ? `${MAINURL}/#/login`
        : `file://${__dirname}/index.html#login`
    // 使用hash对子页面跳转，这是vue的路由思想
      // loginWindow = new BrowserWindow({
      //   width: 600,
      //   height: 400,
      //   webPreferences: {
      //     webSecurity: false
      //   },
      //   parent: mainWindow // mainWindow是主窗口
      // })
      loginWindow = new newWindow({
        width: 470,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        },
        parent: mainWindow,
        devTools: false,
      })
      loginWindow.setResizable(false)
      loginWindow.loadURL(modalPath)

      loginWindow.on('closed', () => {
        // 登录窗口的处理 关闭登陆窗口需要设置mainWindow = null
        mainWindow = null
        loginWindow = null
      })
      
}

export const createLoginWinx = createLoginWins;
