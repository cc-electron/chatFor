let {ipcRenderer} = window.require('electron')


// export const ipcTowCenter = () => {
//  ipcRenderer.sendSync 为异步处理。。。。
//     return ipcRenderer.sendSync('synchronous-message','logined')
// }

// In main process.
// const {ipcMain} = require('electron')
// ipcMain.on('asynchronous-message', (event, arg) => {
//     if(arg === 'ping')
//         event.sender.send('asynchronous-reply', 'pong');
//     else
//         event.sender.send('asynchronous-reply', 'unrecognized arg');
// })

// In renderer process (web page).
export const ipcTowCenter = () => {
    return new Promise(resolve => {
        ipcRenderer.send('synchronous-message', "center")
        resolve()
        // ipcRenderer.on('asynchronous-reply', (event, result) => {
        //     resolve(result);
        // })
    });
}

export const ipcToResize = (arg) => {
    return new Promise(resolve => {
        console.log(12345)
        ipcRenderer.send('resize', arg)
        resolve()
    });
}

export const ipcToLogined = (arg) => {
    return new Promise(resolve => {
        ipcRenderer.send('logined')
        resolve()
    });
}

export const ipcToLogout = (arg) => {
    return new Promise(resolve => {
        ipcRenderer.send('logout')
        resolve()
    });
}

