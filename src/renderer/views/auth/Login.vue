<template>
<div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title">
            <img src="@/assets/icon_zhuce_top.png" alt="">
            <h3>
                欢迎来到超信！
            </h3>
            <h5>更加私密、更加安全</h5>
        </div>
        <el-form-item prop="username">
            <!-- <span class="svg-container svg-container_login">
                <svg-icon icon-class="user" />
            </span> -->
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="password">
            <!-- <span class="svg-container">
                <svg-icon icon-class="password"></svg-icon>
            </span> -->
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
            <img class="show-pwd" v-show="!pwdType" @click="showPwd" src="@/assets/icon_eye_xs.png" alt="">
            <img class="show-pwd" v-show="pwdType" @click="showPwd" src="@/assets/icon_eye_yc.png" alt="">

        </el-form-item>
        <div class="pwd-style">
            <div class="remember-pwd" @click="rememberPwd">
                <img v-show="!remember" src="@/assets/icon_jzmm_no.png" alt="">
                <img v-show="remember" src="@/assets/icon_jzmm.png" alt="">
                <span>记住密码</span>
            </div>
            <div class="forget-pwd" @click="rememberPwd">
                <span>忘记密码？</span>
            </div>
        </div>
        <el-form-item>
            <el-button type="primary" style="width:100%;" :disabled="!loginForm.username || !loginForm.password" :loading="loading" @click.native.prevent="handleLogin">
                登录
            </el-button>
        </el-form-item>
        <p class="to-registered">还没账号？<span>立即注册</span></p>
    </el-form>
</div>
</template>

<script>
import {
    isvalidUsername
} from '@/utils/validate'
import {ipcTowCenter,ipcToResize,ipcToLogined} from '../../../tool/ipcRenderer.js'
import {loginStore} from '../../../tool/storage.js'

export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入正确的用户名'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error('密码不能小于5位'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateUsername
                }],
                password: [{
                    required: true,
                    trigger: 'blur',
                    validator: validatePass
                }]
            },
            loading: false,
            pwdType: 'password',
            remember: localStorage.getItem('remember')
        }
    },
    created(){
        
    },
    mounted() {
        console.log("进入页面不让调整窗口")
        console.log(this.remember);
        // let width = screen.width
        // let height = screen.height
        // let y = (height - 470)/2
        // let x =  (width - 800)/2
        // window.moveTo(x,y)
        // console.log(x,y,'xxxxxxx22222')
        window.resizeTo(470,800);

        
    },
    // beforeRouteLeave(to, from, next) {
        
    //     next();
    // },
    methods: {
        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        rememberPwd() {
            this.remember = !this.remember;
            localStorage.setItem('remember', this.remember ? true : "");
            // this.remember?loginStore.set("isLogin",true):loginStore.set("isLogin",false)
            
            // window.resizeTo(1000,750);
            // ipcTowCenter().then(()=>{})
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('Login', this.loginForm).then(() => {
                        this.loading = false
                        this.$router.push({
                            path: '/'
                        })
                        // ipcToLogined().then(()=>{})
                        // ipcToResize(true).then(()=>{})
                        loginStore.set("isLogin",true)
                        // let width = screen.width
                        // let height = screen.height
                        window.resizeTo(1000,750);
                        this.$bus.$emit('winCenter',1000,750)
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
                    loginStore.set("isLogin",false)
                    return false
                }
            })
        },
        
    }
}
</script>

<style lang="scss">
.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #fff;
    user-select: none;

    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 275px;
        margin: 0 auto;
    }

    .title {
        margin-top: 50px;

        img {
            width: 90px;
        }

        h3 {
            font-size: 24px;
            letter-spacing: 0px;
            color: #1ab2ff;
            font-weight: bold;

        }

        h5 {
            margin-top: 12px;
            margin-bottom: 60px;
            font-size: 14px;
            letter-spacing: 0px;
            color: #333333;

            span {
                color: #1ab2ff;
                cursor: pointer;
            }
        }
    }

    .el-input {
        display: inline-block;
        height: 47px;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 0;
            color: #333;
            height: 47px;

            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }

    .el-form-item {
        margin-bottom: 13px;
        border: 0;
        border-bottom: 1px solid #f2f2f2;
        background: #fff;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        cursor: pointer;
        user-select: none;
        width: 14px;
    }

    .pwd-style {
        display: flex;
        margin-bottom: 30px;
        justify-content: center;

        .remember-pwd {

            cursor: pointer;

            img {
                width: 12px;
                vertical-align: middle;
            }

            span {
                margin-left: 5px;
                font-size: 14px;
                color: #333333;
                vertical-align: middle;
            }
        }

        .forget-pwd {
            flex: 1;
            margin-top: 3px;
            text-align: right;
            font-size: 14px;
            color: #1ab2ff;

            span {
                position: relative;
                cursor: pointer;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 90%;
                    height: 1px;
                    background: #1ab2ff;
                }

            }

        }
    }

    .to-registered {
        text-align: center;
        margin-top: 30px;
        font-size: 14px;
        color: #999999;

        span {
            color: #1ab2ff;
            position: relative;
            cursor: pointer;

            &::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 100%;
                height: 1px;
                background: #1ab2ff;
            }
        }
    }

}

.is-disabled {
    opacity: 0.4;
}

.el-form-item__content .el-button {
    background-color: #1ab2ff;
    border-color: #1ab2ff;
    box-shadow: 0px 3px 12px 0px rgba(26, 178, 255, 0.3);
}
</style>
