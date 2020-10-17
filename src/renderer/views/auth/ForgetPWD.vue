<template>
<div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title">
            <img src="@/assets/icon_zhuce_top.png" alt="">
            <h3>
                忘记密码！
            </h3>
            <h5>通过安全问题找回密码</h5>
        </div>
        <el-form-item prop="username">
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" />
            <img class="show-pwd" v-show="loginForm.username" @click="loginForm.username = ''" src="@/assets/icon_del.png" alt="">
        </el-form-item>

        <el-select v-model="loginForm.value" placeholder="请选择安全问题">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-form-item prop="answer">
            <el-input name="answer" type="text" v-model="loginForm.answer" autoComplete="on" placeholder="答案 " />
            <img class="show-pwd" v-show="loginForm.answer" @click="loginForm.answer = ''" src="@/assets/icon_del.png" alt="">
        </el-form-item>

        <div class="pwd-style">
            <p @click="toPath('setPWD')">下一步</p>

        </div>
        <el-form-item>
            <el-button type="primary" style="width:100%;" :disabled="!loginForm.username || !loginForm.answer || !loginForm.value" :loading="loading" @click.native.prevent="handleLogin">
                下一步
            </el-button>
        </el-form-item>
    </el-form>
    <p class="back" @click="toPath(-1)">取消</p>
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
        const validateAnswer = (rule, value, callback) => {
            if (!value) {
                callback(new Error('密保答案不能为空'))
            } else {
                callback()
            }
        }
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],

            loginForm: {
                username: '',
                answer: '',
                value: '',
            },
            loginRules: {
                username: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateUsername
                }],
                answer: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateAnswer
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
            if (path == -1) {
                this.$router.go(-1);
            } else {
                this.$router.push({
                    path: '/' + path
                });
            }

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

    .back {
        position: absolute;
        bottom: 32px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #999999;
        cursor: pointer;
        font-weight: bold;

    }

}

.el-select {
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
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
