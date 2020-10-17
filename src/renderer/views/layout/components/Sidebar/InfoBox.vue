<template>
<div class="info-box">
    <div class="info-box-mark" @click="hideBox"></div>
    <div class="info-box-cent">
        <div class="login-out">
            <div class="logo">
                <img src="@/assets/icon_zhuce_top.png" alt="">
                <span>超信</span>
            </div>
            <div class="login-outBtn">注销</div>
        </div>
        <div class="info-desc">
            <div class="info-avatar">
                <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
            </div>
            <div class="info-name">
                <h4>CA、宝贝Tony马</h4>
                <p class="account">宝贝Tony马</p>
                <div class="signature">宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝宝贝</div>
            </div>
        </div>
        <div class="info-item online-style">
            <div class="info-item-icon">
                <div class="online"></div>
            </div>
            <div class="info-item-title">
                在线
            </div>
        </div>
        <div class="info-item" @click="showInfoBox('info')">
            <div class="info-item-icon">
                <img src="@/assets/userInfo.png" alt="">
            </div>
            <div class="info-item-title">
                个人资料
            </div>
        </div>
        <div class="info-item" @click="showInfoBox('set')">
            <div class="info-item-icon">
                <img src="@/assets/set.png" alt="">
            </div>
            <div class="info-item-title">
                设置
            </div>
        </div>
        <div class="info-item">
            <div class="info-item-icon">
                <img src="@/assets/gx.png" alt="">
            </div>
            <div class="info-item-title">
                检查更新
            </div>
        </div>
        <div class="info-item">
            <div class="info-item-icon">
                <img src="@/assets/yjfk.png" alt="">
            </div>
            <div class="info-item-title">
                意见反馈
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {
        hideBox() {
            this.$emit('hideBox', true)
        },
        showInfoBox(type) {
            this.hideBox();
            this.$emit('showBox', type)
        }

    },
};
</script>

<style lang="scss" scoped>
.info-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    animation: top .2s;
    animation-iteration-count: 1;

    @keyframes top {
        0% {
            top: -10px;
        }

        50% {
            top: 2px;
        }

        100% {
            top: 0px;
        }
    }

    .info-box-mark {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;

    }

    .info-box-cent {
        position: absolute;
        left: 10px;
        top: 55px;
        width: 330px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba($color: #000000, $alpha: .5);

        &::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 8px;
            z-index: 1;
            width: 22px;
            height: 10px;
            background: url('../../../../assets/sj.png') no-repeat;
        }

        .login-out {
            padding: 15px 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;

            .logo {
                flex: 1;

                img {
                    vertical-align: middle;
                    width: 26px;
                }

                span {
                    margin-left: 4px;
                    vertical-align: middle;
                    font-size: 12px;
                    color: #888;
                    font-weight: bolder;
                }
            }

            .login-outBtn {
                font-size: 12px;
                color: #000;
                cursor: pointer;
            }

        }

        .info-desc {
            display: flex;
            padding: 15px 20px;
            box-sizing: border-box;

            .info-avatar {
                img {
                    border-radius: 50%;
                    width: 60px;
                }
            }

            .info-name {
                margin-left: 15px;

                h4 {
                    font-size: 16px;
                    font-weight: bolder;
                    color: #333;
                }

                .account {
                    margin-top: 5px;
                    font-size: 12px;
                    color: #333;
                }

                .signature {
                    margin-top: 10px;
                    font-size: 12px;
                    color: #999;
                    width: 200px;
                    word-break: keep-all;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .info-item {
            margin: 10px;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover {
                .info-item-title {
                    color: #999;
                }
            }

            &.online-style {
                .info-item-title {
                    color: #333 !important;
                }

            }

            &:last-child {
                border-bottom: 0;
            }

            .info-item-icon {
                padding: 15px;
                box-sizing: border-box;

                .online {
                    margin-right: 8px;
                    width: 12px;
                    height: 12px;
                    background: #39cc7e;
                    border-radius: 50%;
                }

                img {
                    width: 20px;
                }
            }

            .info-item-title {
                font-size: 15px;
                color: #333;
            }
        }

    }
}
</style>
