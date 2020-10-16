const path = require('path')

const psths = path.join(process.cwd(), __dirname, 'MyApp.app')

let paths = path.resolve(__dirname, '../../../../')
// console.log(psths, 'psths')
// console.log(paths, 'paths')

// 键盘翻译处理 在原有玩法上加入[] 解析则解析[]内的内容
// let data = '[foo bar]/[red]/1 [foo bar]/[blue]/2'

// ===> 解法2
let data = '23/23 23/25 23/[blue]/25 [foo bar]/[red]/1 23/[blue]/2 23/2 [blue]/2 [blue flow]/2'
function splitIt(s) {
    return s
        .split(/(?<=(?:\d|\]))\s+/g) //空格前面是数字或者]
        .map(s => s.replace(/[[\]]/g, ""));
}
data = splitIt(data)
console.log(data,'data')
// (?<=pattern) 
// https://www.runoob.com/regexp/regexp-metachar.html
// https://www.cnblogs.com/onepixel/articles/7717789.html
// 反向(look behind)肯定预查，与正向肯定预查类似，只是方向相反。例如，"(?<=95|98|NT|2000)Windows"能匹配"2000Windows"中的"Windows"，但不能匹配"3.1Windows"中的"Windows"。

// (?: pattern)
// 匹配 pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用 "或" 字符(|) 来组合一个模式的各个部分是很有用。例如， 'industr(?:y|ies) 就是一个比 'industry | industries' 更简略的表达式。

// var str = "abcccZW863ab88";
// var reg = /abcc(?![A-Z])/g;
// console.log(str.match(reg)); // abcc


// => ['foo bar/red/1', 'foo bar/blue/2']
// ====> 解法
// 字符串
var str = '[foo bar]/[red]/1 [foo bar]/[blue]/2'
var re = /\[(.+?)\]/g;   // [] 中括号

// var founds = str.match(re)
// console.log(founds,'founds')

var foundf = [...str.matchAll(re)];
var found = [...foundf];
//["[foo bar]", "[red]", "[foo bar]", "[blue]"]
var mat_str = []
var yuan_str = []
found.map(v => {
    yuan_str.push(v[1])
    mat_str.push(v[1].split(' ').join('--'))
    console.log(v[1].split(' ').join('--'),'ccvvv')
})

console.log(mat_str, yuan_str);

yuan_str.map((v,i)=>{
    // let regs = /`${v}`/
    let regs = new RegExp(`${v}`,"g")
    console.log(regs,'reg')

    str = str.replace(regs, mat_str[i])
})
console.log(str,'strsss')

console.log(found,'found')
// strsss [foo--bar]/[red]/1 [foo--bar]/[blue]/2 转译完之后 直接去掉左右括号
str = str.replace(/\[/g, "")
str = str.replace(/\]/g, "")
// => foo--bar/red/1 foo--bar/blue/2
var strArr = str.split(" ")
strArr = strArr.map(v => {
    return v = v.split("--").join(" ")
})

console.log(str, 'strsss')
console.log(strArr, 'strArr')

// '[foo bar]/[red]/1 [foo bar]/[blue]/2'.replace(/(foo bar)/, 'foo--bar')
// ["foo bar/red/1", "foo bar/blue/2"]
let datas = strArr
datas && datas.some((vd, vindex) => {
    let data = vd.split('/')
    let len = data.length
})

// JS 正则表达式 获取小括号 中括号 花括号内的内容

// var str = "123{xxxx}456[我的]789123[你的]456(1389090)789";

// var regex1 = /\((.+?)\)/g;   // () 小括号
// var regex2 = /\[(.+?)\]/g;   // [] 中括号
// var regex3 = /\{(.+?)\}/g;  // {} 花括号，大括号

// // 输出是一个数组
// console.log(str.match(regex1));
// console.log(str.match(regex2));
// console.log(str.match(regex3));

// 零宽匹配
// (?=exp):零宽度正预测先行断言，它断言自身出现的位置的后面能匹配表达式exp。

// #匹配后面为_path，结果为product
//   'product_path'.scan /(product)(?=_path)/

// (?<=exp):零宽度正回顾后发断言，它断言自身出现的位置的前面能匹配表达式exp

// #匹配前面为name:，结果为wangfei
// 'name:wangfei'.scan /(?<=name:)(wangfei)/ #wangfei

// (?!exp):零宽度负预测先行断言，断言此位置的后面不能匹配表达式exp。

// #匹配后面不是_path
// 'product_path'.scan /(product)(?!_path)/  #nil
// #匹配后面不是_url
// 'product_path'.scan /(product)(?!_url)/  #product

// (?<!exp):零宽度负回顾后发断言来断言此位置的前面不能匹配表达式exp

// #匹配前面不是name:
// 'name:angelica'.scan /(?<!name:)(angelica)/  #nil
// #匹配前面不是nick_name:
// 'name:angelica'.scan /(?<!nick_name:)(angelica)/#angelica


function splitIt(s) {
    return s
        // 直接 split 不行，但是可以先 replace 再 split
        // 原因不明，如果谁知道告诉一声，谢谢！！！
        .replace(/(?:(?<=(^|\])[^[]*)\s){1,}(?=.*?\[)/g, "|")
        .split("|")
        .map(s => s.replace(/[[\]]/g, ""));
}

let datass = "23/23 23/25 23/[blue 1]/25 [1 foo bar]/[red]/1 23/[blue]/2 23/2 [blue]/2 [blue flow]/2";
let b = splitIt(datass)
console.log(b ,'bbbb');
// [ '23/23',
//   '23/25',
//   '23/blue 1/25',
//   '1 foo bar/red/1',
//   '23/blue/2',
//   '23/2',
//   'blue/2',
//   'blue flow/2' ]