<template>
<div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title">
            <img src="@/assets/icon_zhuce_top.png" alt="">
            <h3>
                欢迎注册超信！
            </h3>
            <h5>注册即同意<span @click="toPath">《用户协议》</span></h5>
        </div>
        <el-form-item prop="username">
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="6~12位数字字母组合账号" />
            <img class="show-pwd" v-show="loginForm.username" @click="loginForm.username = ''" src="@/assets/icon_del.png" alt="">
        </el-form-item>
        <el-form-item prop="password">
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="6~12位数字字母组合密码"></el-input>
            <img class="show-pwd" v-show="!pwdType" @click="showPwd" src="@/assets/icon_eye_xs.png" alt="">
            <img class="show-pwd" v-show="pwdType" @click="showPwd" src="@/assets/icon_eye_yc.png" alt="">

        </el-form-item>
        <el-form-item prop="password">
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="再次输入密码"></el-input>
            <img class="show-pwd" v-show="!pwdType" @click="showPwd" src="@/assets/icon_eye_xs.png" alt="">
            <img class="show-pwd" v-show="pwdType" @click="showPwd" src="@/assets/icon_eye_yc.png" alt="">

        </el-form-item>
        <div class="pwd-style">

        </div>
        <el-form-item>
            <el-button type="primary" style="width:100%;" :disabled="!loginForm.username || !loginForm.password" :loading="loading" @click.native.prevent="handleLogin">
                注册
            </el-button>
        </el-form-item>
        <p class="to-registered">已有账号？<span @click="toPath('login')">立即登录</span></p>
    </el-form>
</div>
</template>

<script>
import {
    isvalidUsername
} from '@/utils/validate'

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
    mounted() {
        console.log(this.remember);
    },
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
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        toPath(path) {
            this.$router.push({
                path: '/' + path
            });
        }
    }
}
</script>

<style lang="scss" scoped>
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
