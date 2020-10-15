import {
  app,
  BrowserWindow,
  BrowserView,
  globalShortcut,
  dialog,
  Menu,
  ipcMain,
  Tray,
  screen,
  nativeImage,
} from "electron";
const isDev = require("electron-is-dev");
const menuTemplate = require('./menu')
const Store = require('electron-store')
const path = require('path')
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
let tray = null
app.isQuiting = false;
  
  
function createWindow() {
  
  console.log(__static,'23333')

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
  // 'x': mainWindowState.x,
  // 'y': mainWindowState.y,
  // 'width': mainWindowState.width,
  // 'height': mainWindowState.height,

  // width: 470,
  // height: 800,

  mainWindow = new BrowserWindow({
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

  mainWindow.setTitle('超信')
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
      // // mainWindow.setSkipTaskbar(true)
      // mainWindow.hide()

      // console.log(mainWindow.isVisible(),'isVisible')
      // if (process.platform === 'darwin') {
      //   // 回收BrowserWindow对象
      //   event.preventDefault()
      //   // mainWindow.hide()
      //   mainWindow.minimize()
      // } else {
      //   mainWindow.hide()
      //   mainWindow.setSkipTaskbar(true)
      //   event.preventDefault()
      // }

      // 回收BrowserWindow对象
      // 窗口缩小到最小才能关闭程序
      if(mainWindow.isMinimized()||app.isQuiting){
        mainWindow = null;
      }else{
        event.preventDefault();
        // mainWindow.minimize();
        mainWindow.hide();
      }

  });
  // console.log('关闭主窗口')
  mainWindow.on('closed', () => {
    console.log('23333close')
    // loginWindow = null;
    mainWindow = null;
  
  })
  // win.isVisible() ? win.hide() : win.show();
  

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
app.on('ready', ()=>{
  createWindow();
  handleTray()
})

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

// 当应用被激活时发出。 各种操作都可以触发此事件, 例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它。
app.on('activate', () => {
  mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
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
function handleTray(){
  console.log('设置托盘')
  let timer = null
  let count = 0
  // if (process.platform === 'darwin') {
  //   tray = new Tray(nativeImage.createEmpty());
  //   // tray.setImage();
  //   const imgages = nativeImage.createFromPath(path.resolve(__dirname, '../../build/icons/icon.ico'))
  //   imgages.setTemplateImage(true)
  //   // imgages.isMacTemplateImage(true)
  //   tray = new Tray(imgages)
  // }else{
  //   tray = new Tray(`${__static}/icon.ico`)
  // }

  // const contextMenu = Menu.buildFromTemplate([
  //     {
  //         label: '退出',
  //         click: function(){
  //             app.quit();
  //         }
  //     }
  // ]);

  // tray.setContextMenu(contextMenu);
  // tray.setToolTip('应用标题');

  // // 任务栏点击事件
  // // let timeCount = 0
  // // tray.on('click', function (Event) {
  // //   setTimeout(() => {
  // //     if (timeCount === 0) {
  // //       console.log('单机事件11111111')
  // //       timeCount = 0
  // //     }
  // //   }, 300)
  // // })
  

  // tray.on('click',function(){
  //   mainWindow.show();
  // })
  // // tray.on('left-click',function(){
  // //   mainWindow.show();
  // // })
  // // tray.on('right-click',(e,b,p)=> {
  // //   console.log('2333click')
  // //   console.log(e,b,p)
  // //   mainWindow.show();
  // //   // mainWindow.setSkipTaskbar(false);
  // // })

  // if (mainWindow) {
  //   if (mainWindow.isMinimized()) mainWindow.restore()
  //   if (process.platform !== 'darwin') {
  //     mainWindow.show()
  //     mainWindow.setSkipTaskbar(false)
  //   }
  //   mainWindow.focus()
  // }
  const MenuTray = Menu.buildFromTemplate([
  {
    label: '打开超信',
    click: () => {
      mainWindow.show()
    }
  },
  {
    label: 'for radio',
    click: () => {
      console.log(234567654567)
      // shell.openExternal('https://frequencecountry.mirandais.fr')
    }
  },
  {
    label: 'for facebook',
    click: () => {
      console.log(234567654567)
      // shell.openExternal('https://www.facebook.com/Frequence-Country-862322540540302/')
    }
  },
  {
    label: '退出程序',
    click: () => {
      app.isQuiting = true
      app.quit()
    }
  },
  {
    label: 'ping',
    click: () => {
      mainWindow.webContents.send('ping')
    }
  }
])

  mainWindow.setSkipTaskbar(true)

  let unread 
  let read 

  if(isDev){
    unread = path.join(__dirname, '../../static/icons/icons.png')
    read = path.join(__dirname, '../../static/icons/icons.png')
  }else{
    unread = path.join(__dirname, '/static/icons/icons.png')
    read = path.join(__dirname, '/static/icons/icons.png')
  }

  let imgRead = nativeImage.createFromPath(read)
  let imgUnread = nativeImage.createFromPath(unread)

  // let tray = new Tray(imgages)
  let tray = new Tray(imgRead)
  tray.setImage(imgUnread)
  tray.destroy()
  tray = new Tray(imgRead)

  tray.setImage(imgUnread)
  
  tray.setToolTip('提示title')
  tray.setContextMenu(MenuTray)

  // 双击 托盘图标 打开窗口
  tray.on('double-click',function(){
      mainWindow.show()
  })

}


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
