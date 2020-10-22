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
  // IOCounters
} from "electron";
const { autoUpdater } = require('electron-updater')
const isDev = require("electron-is-dev");
const menuTemplate = require('./menu')
const Store = require('electron-store')
const path = require('path')
import {loginStore} from '../tool/storage'
import ipcMainFun from '../tool/ipcMain'
import {newWindow} from './AppWindow'

// let countsf = IOCounters
// console.log(countsf,'countsf',IOCounters)



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
  makeUpdater()
  console.log(__static,'23333',path.join(__static, '/photo.png'))

  // 设置原生应用菜单
  let menu = Menu.buildFromTemplate(menuTemplate.template)
  Menu.setApplicationMenu(menu)
  // 设置扩展栏菜单
  const dockMenu = Menu.buildFromTemplate([
      {
        label: 'New Window',
        click () { console.log('New Window') }
      }, {
        label: 'New Window with Settings',
        submenu: [
          { label: 'Basic' },
          { label: 'Pro' }
        ]
      },
      { label: 'New Command...' }
    ])
    
    app.dock.setMenu(dockMenu)
  /**
   * Initial window options
   */
  // BrowserWindow.removeDevToolsExtension("Console");
  // BrowserWindow.removeDevToolsExtension("console");


  mainWindow = new BrowserWindow({
    // width: 470,
    // height: 800,
    // title: 'chaoxin',
    width: 1000,
    height: 700,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true, // 添加这一配置
		},
    devTools: false,
    show: true,
    icon: path.join(__static, '/photo.png')
  });
  if (process.platform === 'darwin') {
      app.dock.setIcon(path.join(__static, '/photo.png'));
  }

  mainWindow.setTitle('超信')
  // mainWindow.getNormalBounds()

  mainWindow.loadURL(winURL);
  // let installed = BrowserWindow.getDevToolsExtensions()
  // console.log(installed);

  mainWindow.on('close', (event) => {
      // 回收BrowserWindow对象
      // 窗口缩小到最小才能关闭程序
      if(mainWindow.isMinimized()||app.isQuiting){
        mainWindow = null;
      }else{
        event.preventDefault();
        // mainWindow.minimize();
        app.isQuiting = false
        console.log(loginStore.get("isLogin"),'islogin2333')

        console.log(tray,'istray')
        
        if(loginStore.get("isLogin")){
          loginStore.set("isLogin",false)
          console.log(loginStore.get("isLogin"),'islogin??')
        }
        mainWindow.hide();
        mainWindow.setSkipTaskbar(true);
      }
      

  });
  // console.log('关闭主窗口')
  mainWindow.on('closed', () => {
    console.log('23333close')
    mainWindow = null;
  
  })

   // const view = new BrowserView();
  // app.dock.setBadge('.');
  
  mainWindow.on('blur', () => {
    // 弹跳功能 information 只跳一次 critical 直到窗口激活才会停止
    // app.dock.bounce("critical");
    // 更改底部扩展栏图标
    // app.dock.setIcon(path.join(__static, '/appicon.png'));
    
    // 冒泡信息提示
    const badgeString = app.dock.getBadge();
    console.log(badgeString,'badgeString')

    if (badgeString === '') {
      app.dock.setBadge('1');
      console.log(badgeString,'2333badgeString')
    } else {
      app.dock.setBadge((parseInt(badgeString) + 1).toString());
    }

    // let countssss = app.badgeCount;
    // console.log(countssss,'counts')
    // if (badge.count > 0) {
    //     app.dock.setBadge('12345654');
    // } else {
    //     app.dock.setBadge('99000');
    // }
    // if (process.platform === 'darwin') {
    //     app.dock.setBadge('2');
    //     app.setBadgeCount(2);
        
    // }
    

    
  });
  

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
  ipcMainFun(mainWindow)
  
  // 崩溃重启
  // reLive(mainWindow);

  console.log('23333居中')
  if(loginStore.get("isLogin")){
    console.log('2333已经登陆了')
    mainWindow.setSize(1000, 700)
    mainWindow.center()
    mainWindow.setResizable(true)
  }else{
    console.log('2333没有登录')
    mainWindow.setSize(470, 800)
    mainWindow.center()
    mainWindow.setResizable(false)
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
  console.log('2333强制退出前！！！')
  app.isQuiting = true
})
app.on('quit',()=>{
  console.log('2333强制退出了2333！！！')
  if(loginStore.get("isLogin")){
    loginStore.set("isLogin",false)
    console.log(loginStore.get("isLogin"),'islogin??')
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('强制退出！！！')
    app.quit()
  }
})

// 当应用被激活时发出。 各种操作都可以触发此事件, 例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它。
app.on('activate', () => {
  app.isQuiting = false
  if (mainWindow === null) {
    createWindow()
  }else{
    mainWindow.isVisible() ? null : mainWindow.show();
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

  const MenuTray = Menu.buildFromTemplate([
  {
    label: '打开超信',
    click: () => {
      mainWindow.show();
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

  // let tray = new Tray(imgRead)
  // tray.setImage(imgUnread)
  // tray.destroy()

  tray = new Tray(imgRead)

  // tray.setImage(imgUnread)
  
  tray.setToolTip('提示title')
  tray.setContextMenu(MenuTray)

  // // 双击 托盘图标 打开窗口
  // tray.on('double-click',function(){
  //     mainWindow.show()
  // })

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

let makeUpdater = () => {
  if (isDev) {
    autoUpdater.updateConfigPath = path.join(__dirname, '../../dev-app-update.yml')
  }
  autoUpdater.autoDownload = false
  autoUpdater.checkForUpdates().catch(err => {
      console.error(`Something went wrong`, err);
  });
  autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error ', error === null ? "ubknown" : error.stack)
  })
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...')
  })
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: '应用有新的版本',
      message: '发现新版本，是否现在更新',
      buttons: ['是','否']
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate()
      }
    })
  })
  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      title: '没有新版本',
      message: '当前已经是最新版本'
    })
  })

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
    console.log(log_message)
  })

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      title: '安装更新',
      message: '更新下载完毕，应用将重启并进行安装'
    }, () => {
      setImmediate(() => {
        autoUpdater.quitAndInstall()
      })
    })
  })
}
