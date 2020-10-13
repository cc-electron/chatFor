
# electron-vue （）

* [11, 配置文件](#11)


* [1，侧边栏的折叠展开](#1)
* [2，多文件vue全局功能的应用](#2)
* [3，filter文件和i18n(国际化)的组合使用](#3)
* [4，Pagination组件使用](#4)
* [5，路由拦截](#5)
* [6，message方法只弹出一次](#6)
* [7，element 表单验证](#7)
* [8，时间限制条件](#8)
* [9，mixins的使用](#9)
* [10，echart的使用](#10)
<!-- * [本地文件链接](#5) -->
<!-- <h3 id="3">表格的使用</h3>
<h3 id="4">页内链接跳转</h3>
<h3 id="5">本地文件链接</h3>
<h2 id="6">软件推荐</h2>
<h2 id="7">参考资料</h2> -->

<h3 id="11">11, 接口配置文件</h2>

- 文件地址 `config/dev.env.js` `config/**`

```js
-- axios 的 BASE_API 根据以上配置文件 通过 process.env.BASE_API 自动获取
-- 所以开发环境以及测试环境 只需要配置 config/dev.env.js 的 BASE_API 选项即可
-- 发包以及线上 在 config/prod.env.js 中配置 BASE_API 选项即可
-- npm run build:dir 只打包mac app包，在build/mac *.app

打包问题
-- node模块包不能进行相关的压缩处理 https://juejin.im/post/6844903773853188109

```



<h3 id="1">1，侧边栏的折叠展开</h2>
- 文件地址 `src/components/common/Header`

```js
data() {
        return {
            collapse: true,
                ...

```
<h3 id="2">2，多文件vue全局功能的应用</h3>
- 文件地址 `src/utils/request.js` `src/app.config.js`

```js
    import Vue from 'vue';
    import router from '../router';
    const vue = new Vue({
        router
    });

    import i18n from './i18n';
    const vues = new Vue({
        i18n
    });

    // 使用
    vue.$router.push({
        name: 'login'
    });
    vues.$t('common.accountCheck')
```
<h3 id="3">3，filter文件和i18n(国际化)的组合使用</h3>
- 文件地址 `src/filter.js` `src/i18n/module/common/zh.js` `main.js`

```js
    const local = localStorage.getItem('local') ? localStorage.getItem('local') : 'zh';
    const lang = require(`@/i18n/module/common/${local}.js`);
    const common = lang.default;
    export const filtergameTypes = ((value) => {
        let obj = common.filter.gameTypes;
        if (value) {
            return obj[value];
        } else {
            return "";
        }
    })
    // i18n
    const common = {
        filter:{
            gameTypes: {
                        1: "牛牛红包",
                        2: "扫雷红包",
                    },
            }
        }
    }
    //过滤器
    import * as filters from './filter';
    Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

    // 使用
    {{2|filtergameTypes}}


```

<h3 id="4">4，Pagination组件使用</h3>
- 文件地址 `src/components/common/Pagination.vue` `src/pages/redEnveGMant/RedEnvNote.vue`

```html
    <pagination
        v-show="pageTotal > 0"
        :total="pageTotal"
        :page.sync="query.pageIndex"
        :limit.sync="query.pageSize"
        @pagination="getData"
    />
    <!-- vue -->
    data(){
        query: {
				pageIndex: 1,
				pageSize: fData.pageSize,
        },
        pageTotal: 0,
    }
    getData(params) {
			if (params) {
				this.query.pageIndex = params.page;
				this.query.pageSize = params.limit;
            }
            ...
    }


```


<h3 id="5">5，路由拦截</h3>
- 文件地址 `src/main.js` `src/utils/request.js`

```js
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ams_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});


```

<h3 id="6">6，message方法只弹出一次</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js
// 通常都是在main.js中处理
import { Message } from 'element-ui'
// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
/** 
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
export default class DonMessage {
    success(options, single = true) {
        this[showMessage]('success', options, single)
    }
    warning(options, single = true) {
        this[showMessage]('warning', options, single)
    }
    info(options, single = true) {
        this[showMessage]('info', options, single)
    }
    error(options, single = true) {
        this[showMessage]('error', options, single)
    }

    [showMessage](type, options, single) {
        if (single) {
            // 判断是否已存在Message
            if (document.getElementsByClassName('el-message').length === 0) {
                Message[type](options)
            }
        } else {
            Message[type](options)
        }
    }
}

// main.js
import DonMessage from '@/components/common/message'
Vue.prototype.$message = new DonMessage()

```

<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```html
    <!-- 编辑弹出框 -->
    <el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" width="30%">
        <el-form :model="ruleForm" label-width="90px" :rules="rules" ref="ruleForm">
            <el-form-item :label="$t('common.rolename')" prop="name">
                <el-input v-model="ruleForm.name" :placeholder="$t('common.p_name')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.remark')" prop="address">
                <el-input v-model="ruleForm.address" :placeholder="$t('common.p_remark')"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="resetEdit('ruleForm')">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="saveEdit('ruleForm')">{{ $t('common.ok') }}</el-button>
        </span>
    </el-dialog>


    data(){
        return{
            ruleForm: {
                formTitle: '', //模态框title
                name: '',
                address: ''
            },
            rules: {
                name: [
                    { required: true, message: this.$t('common.p_name'), trigger: 'blur' },
                    { min: 2, max: 20, message: this.$t('common.str_len'), trigger: 'blur' }
                ]
            }
        }
    }
    methods:{
        saveEdit(){
            this.$refs[formName].validate(valid => {
				if (valid) {
					this.editVisible = false;
					if (this.formStatus === 2) {
						this.$message.success(`修改第 ${this.idx + 1} 行成功`);
						this.$set(this.tableData, this.idx, this.form);
					}
					this.resetEdit(formName);
					this.getData();
				} else {
					console.error('error submit!!');
					return false;
				}
			});
        }
    }

```

<h3 id="8">8，时间限制条件</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js

pickerOptions: {
    disabledDate(time) {
        //只能选今天及以后的 如果没有后面的-8.64e7就是不可以选择今天的
        return time.getTime() < Date.now() - 8.64e7;
    }
}

```

<h3 id="9">9，mixins的使用</h3>
- 文件地址 `src/pages/account/AgencyMant.vue` `src/mixins`
- 作用相当于合并两个vue，组成新的vue对象，方法按原组件调用即可

```js
    import fData from '@/app.config';
    import { getAgeList } from '@/api/account';
    export const getAgencyId = {
        data() {
            return {
                agenListpro: [],
                token: fData.token(),
            }
        },
        created() {
            if (this.token.isAdmin === 1) {
                this.getAenList();
            }
        },
        // watch: {
        //     page: 'loadData'
        // },
        methods: {
            // 查询代理列表
            getAenList() {
                getAgeList().then(res => {
                    if (res.success) {
                        this.agenListpro.push({ agencyId: '', account: this.$t('common.all') }, ...res.data)
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },

        }
    }




<div class="pk-inp-box pk-select" v-if="token.isAdmin === 1">
    <label>{{ $t('common.siteId') }}:</label>
    <el-select filterable v-model="query.agencyId" :placeholder="$t('common.all')" class="selbox pull-width">
        <el-option
            v-for="(item) in agenListpro"
            :key="item.account" :label="item.account" :value="item.account">
        </el-option>
    </el-select>
</div>

import { getAgencyId } from "@/mixins/initAgentList";
mixins: [ getAgencyId ],
if(this.query.agencyId === this.$t('common.all')){
    this.query.agencyId = ''
}
```

<h3 id="10">10，echart的使用</h3>
- 文件地址 `src/main.js` `src/components/common/myCharts.js` `src/pages/statistics/chartline.vue`

```js
import myCharts from './components/common/myCharts'
Vue.use(myCharts)

...mounted(){
        this.$chart.line1('chart1',{},true);
        let _this = this;
        setTimeout(()=>{
            this.$chart.line1('chart1',this.voptions,false);
        },2000)
    },
    data(){
        return{
            voptions: {
                color: ['#4ca3f4', "#fb6637", "#b089fc"], //三个折线图背景颜色
                title: {
                    text: '趋势分析',
                    left: '2.7%',
                    top: '5%',
                    textStyle: {
                        color: "#333",
                        fontWeight: "normal",
                        fontSize: "22",
                    }
                },
                legend: {
                    icon: "rect",
                    itemHeight: 2, // 设置高度
                    itemGap: 20, //设置间距
                    textStyle: {
                        color: "#757575"
                    },
                    left: '2.7%',
                    top: "14%",
                    data: ['自然新增', '推广新增', '导入会员']
                    // data: dataTitle
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '2.7%',
                    top: "28%",
                    containLabel: true,
                    borderColor: "#eaeaea"
                },
                xAxis: {
                    type: "category",
                    data: ['09-02', '09-03', '09-04', '09-05', '09-06', '09-07'],
                    // data: dataTime,
                    axisLine: {
                        lineStyle: {
                            color: "#eaeaea" //x轴线 和 文字颜色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#757575" //x轴线下的文字颜色
                        }
                    },

                },
                yAxis: {
                    type: "value",
                    name: '单位：人',
                    minInterval: 1,
                    nameTextStyle: {
                        color: "#757575"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#eaeaea"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#757575"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#eaeaea",
                            type: 'dashed'
                        }
                    }
                },
                // series: seriesLineArr,
                series: [
                {
                    name: "自然新增",
                    type: "line",
                    data: [200, 300, 400, 110, 60, 70],
                    barWidth: '10%',
                },
                {
                    name: "推广新增",
                    type: "line",
                    barWidth: '10%',
                    data: [500, 300, 400, 140, 60, 700]

                },
                {
                    name: "导入会员",
                    type: "line",
                    barWidth: '10%',
                    data: [270, 92, 480, 110, 350, 70]

                }
                ]
            },
        }
    }


```

<!--<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js

```

<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js

```

<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js

``` -->