import {
    ipcMain
} from "electron";
import {newWindow} from '../main/AppWindow'
const path = require('path')
const Store = require('electron-store')
const settingStore = new Store({
  name: 'Settings'
})
var nodeConsole = require('console');
var consoles = new nodeConsole.Console(process.stdout, process.stderr);
consoles.log('Hello World!');



const ipcMainFun = (mainWindow,loginWindow)=>{
    let settingsWindow
    ipcMain.on('synchronous-message', (event, arg) => {
        if (arg === 'center') {

            mainWindow.center()
            console.log("window 居中显示")

            // mainWindowState.manage(mainWindow);

        }
    })


    // 点击菜单设置选项创建新窗口
    ipcMain.on('open-settings-window', () => {
        const settingsWindowConfig = {
            width: 500,
            height: 400,
            webPreferences: {
                nodeIntegration: true,
            },
            parent: mainWindow
        }
        // 适配好打包路径 => 统一 => package.json => ok
        let settingsFilePath;

        // 生产环境
        // if (!isDev) {
        //   const settingsFileLocation = path.join('file://' + process.cwd(), __dirname, '../settings/settings.html')
        //   settingsFilePath = settingsFileLocation

        // }else{
        //   const settingsFileLocations = path.join('file://' + process.cwd(), '../settings/settings.html')
        //   settingsFilePath = settingsFileLocations
        //   console.log(settingsFileLocations,'settingsFileLocations')
        // }

        const settingsFileLocationz = path.join('file://' + process.cwd(), __dirname, '../settings/settings.html')
        settingsFilePath = settingsFileLocationz



        settingsWindow = new newWindow(settingsWindowConfig)
        settingsWindow.loadURL(settingsFilePath)
        settingsWindow.once('ready-to-show', () => {
            this.show()
        })
        settingsWindow.removeMenu()
        settingsWindow.on('closed', () => {
            settingsWindow = null
        })
    })

    // 根据设置动态修改云同步菜单状态
    ipcMain.on('config-is-saved', () => {
        // mac和windows应用菜单位置不一样
        // let qiniuMenu = process.platform === 'darwin' ? menu.items[3] : menu.items[2]
        // const switchItems = (toggle) => {
        //   [1, 2, 3].forEach(number => {
        //     qiniuMenu.submenu.items[number].enabled = toggle
        //   })
        // }
        [
            'accessKey',
            'secretKey',
            'bucket'
        ].some(key => console.log("key", key, settingStore.get(key)))


    })


    // 调整窗口大小
    ipcMain.on('resize', (event, arg) => {
        mainWindow.setResizable(arg)
    })

    // 登陆处理逻辑 -- 显示父级页面
    ipcMain.on('logined', (event, arg) => {
        // mainWindow.show()
        // loginWindow.hide()

        // consoles.log('2333显示父级页面');
        // loginWindow.setSize(1000, 700)
        // loginWindow.center()
        // mainWindow.setSize(1000, 700)
        mainWindow.setResizable(true)
    })
    ipcMain.on('logout', (event, arg) => {

        console.log('2333重建登陆页面')
        // loginWindow.show()
        // loginWindow.setSize(470, 800)
        // loginWindow.center()

        mainWindow.setResizable(false)
    })

}

export default ipcMainFun