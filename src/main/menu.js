const { BrowserWindow, Menu, app, shell, dialog, ipcMain } = require('electron')
const exec = require('child_process').exec;
// 生产环境
const isDev = require("electron-is-dev");

const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

const path = require('path')

let template = [{
    label: '编辑',
    submenu: [{
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
}, {
    label: '查看',
    submenu: [{
        label: '重载',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                // 重载之后, 刷新并关闭所有之前打开的次要窗体
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(win => {
                        if (win.id > 1) win.close()
                    })
                }
                focusedWindow.reload()
            }
        }
    }, {
        label: '切换全屏',
        accelerator: (() => {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F'
            } else {
                return 'F11'
            }
        })(),
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
        }
    }, {
        label: '切换开发者工具',
        accelerator: (() => {
            if (process.platform === 'darwin') {
                return 'Alt+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }, {
        type: 'separator'
    }, {
        label: '应用程序菜单演示',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                const options = {
                    type: 'info',
                    title: '应用程序菜单演示',
                    buttons: ['好的'],
                    message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
                }
                dialog.showMessageBox(focusedWindow, options, function () { })
            }
        }
    }]
}, {
    label: '窗口',
    role: 'window',
    submenu: [{
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }, {
        label: '重新打开窗口',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: () => {
            app.emit('activate')
        }
    }]
    }, {
        label: '实例',
        role: 'shili',
        submenu: [
            {
                label: '新配置',
                click: () => {
                    ipcMain.emit('open-settings-window')
                }
            },
            {
            label: '新建实例',
            accelerator: 'CmdOrCtrl+N',
            role: 'shili',
            click: (item, focusedWindow) => {
                
                // // shell(winURL)
                // shell.openItem("../../../chat-os/dist/electron/main.js")
                // shell.beep()
                
                // // 此文件 配置于 .electron-vue/webpack.render.config.js
                // let settingsFileLocation = path.join('file://' + process.cwd(), __dirname, '/modal.html')
                // // let settingsFileLocation = path.join('file://' + process.cwd(), __dirname, '../templates/crash-hang.html')
                // // console.log(shell,"shellshellshellshell")
                // console.log(settingsFileLocation, 'settingsFileLocation',__dirname) // file://dist/electron/main.js
                // // // console.log(item, focusedWindow, 'item foucuse')
                // // // shell.openExternal(settingsFileLocation) //置于浏览器中打开对应页面

                // // 打开实例文件
                // // 自定义dialog 在dialog中打开指定页面
                // let win = new BrowserWindow({ width: 400, height: 320 })
                // win.on('close', () => { win = null })
                // win.loadURL(settingsFileLocation)
                // win.show()

                

                // const settingsWindowConfig = {
                //     width: 500,
                //     height: 400,
                //     parent: focusedWindow
                // }
                // console.log(AppWindow,'AppWindow')
                // // settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation)
                // // settingsWindow.removeMenu()
                // // settingsWindow.on('closed', () => {
                // //     settingsWindow = null
                // // })
                
                // https://github.com/shelljs/shelljs/wiki/Electron-compatibility
                // shelljs.exec 未兼容，已损坏
                // console.log(macShell,'macShell')
                // Shell.exec(macShell)
                
                // todo windows 使用
                if (process.platform === 'darwin'){
                    // const macShell = `${path.join(__dirname, '/mac-o.sh')}`
                    // 获取的app路径 需要配置
                    let appPath = path.resolve(__dirname, '../../build/mac/MyApp.app')
                    let appPaths = path.resolve(__dirname, '../../../../../')
                    console.log(appPaths)
                    console.log(appPath,'appPath')
                    let openPath
                    if (isDev){
                        openPath = appPath
                    }else{
                        openPath = appPaths
                    }
                    // todo
                    // 弹出框 或者选项配置键入路径，此路径为shell脚本多开路径
                    // 键入路径

                    var yourscript = exec(`open -n ${openPath}`,
                        (error, stdout, stderr) => {
                            console.log(stdout);
                            console.log(stderr);
                            if (error !== null) {
                                console.log(`exec error: ${error}`);
                            }
                        });

                }
                // const options = {
                //     type: 'info',
                //     title: '应用程序菜单演示',
                //     buttons: ['好的'],
                //     message: `${appPaths}`
                // }
                // dialog.showMessageBox(focusedWindow, options, function () { })
                
                // var yourscript = exec(`sh ${macShell} ${appPath}`,
                //     (error, stdout, stderr) => {
                //         console.log(stdout);
                //         console.log(stderr);
                //         if (error !== null) {
                //             console.log(`exec error: ${error}`);
                //         }
                //     });

               

            }
        }]
    }, 

{
    label: '帮助',
    role: 'help',
    submenu: [{
        label: '学习更多',
        click: () => {
            shell.openExternal('http://electron.atom.io')
        }
    }]
}]

function addUpdateMenuItems(items, position) {
    if (process.mas) return

    const version = app.getVersion()
    let updateItems = [{
        label: `版本 ${version}`,
        enabled: false
    }, {
        label: '正在检查更新',
        enabled: false,
        key: 'checkingForUpdate'
    }, {
        label: '检查更新',
        visible: false,
        key: 'checkForUpdate',
        click: () => {
            require('electron').autoUpdater.checkForUpdates()
        }
    }, {
        label: '重启并安装更新',
        enabled: true,
        visible: false,
        key: 'restartToUpdate',
        click: () => {
            require('electron').autoUpdater.quitAndInstall()
        }
    }]

    items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu()
    if (!menu) return

    let reopenMenuItem
    menu.items.forEach(item => {
        if (item.submenu) {
            item.submenu.items.forEach(item => {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item
                }
            })
        }
    })
    return reopenMenuItem
}

if (process.platform === 'darwin') {
    const name = app.name
    template.unshift({
        label: name,
        submenu: [{
            label: `关于 ${name}`,
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: '服务',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: `隐藏 ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: '隐藏其它',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: '显示全部',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: '退出',
            accelerator: 'Command+Q',
            click: () => {
                app.quit()
            }
        }]
    })

    // 窗口菜单.
    template[3].submenu.push({
        type: 'separator'
    }, {
        label: '前置所有',
        role: 'front'
    })

    addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu
    addUpdateMenuItems(helpMenu, 0)
}

// app.on('ready', () => {
//     const menu = Menu.buildFromTemplate(template)
//     Menu.setApplicationMenu(menu)
// })

app.on('browser-window-created', () => {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', () => {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = true
})
module.exports = {
    template: template
}