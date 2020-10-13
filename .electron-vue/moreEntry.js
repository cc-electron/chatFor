const path = require('path')
const glob = require('glob')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
let globPaths = resolve('src/templates/*.html')
console.log(globPaths,"globPaths")
function getEntry(globPath = globPaths) {
    // let globPath = 'src/**/*.html' // 匹配src目录下的所有文件夹中的html文件
    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)' // 路径为src目录下的所有文件夹
    let files = glob.sync(globPath)
    let filesArr = []
    
    for (let i = 0; i < files.length; i++) {
        let obj = {
            filename: '',
            template: '',
        }
        obj.template = files[i]
        let fileLen = files[i].split('/').length || []
        if(fileLen==0){
            fileLen = files[i].split('\\').length
            obj.filename = (files[i].split('\\'))[fileLen - 1]
        }else{
            obj.filename = (files[i].split('/'))[fileLen-1]
        }
        filesArr.push(obj)
    }
    // console.log("files: ", files)
    // let dirname, entries = []
    // for (let i = 0; i < files.length; i++) {
    //     dirname = path.dirname(files[i])
    //     entries.push(dirname.replace(new RegExp('^' + pathDir), '$2').replace('src/', ''))
    // }
    // console.log("entries: ", entries)
    // console.log("dirname: ", dirname)
    // console.log("filesArr: ", filesArr)
    return filesArr
}

// getEntry()

// function addEntry() {
//     let entryObj = {}
//     getEntry().forEach(item => {
//         let paths = resolve(__dirname, 'src', item, 'index.js')
//         entryObj[item] = paths
//     })
//     return entryObj
// }

module.exports = {
    getEntry: getEntry
}
