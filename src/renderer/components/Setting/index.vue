<template>
<div class="settting-box">
    <div class="setting-box-mark"></div>
    <div class="settting-box-cent">
        <div class="setting-box-title">
            <h3>设置</h3>
            <div class="setting-title-item" :class="{'active':activeIdx == 1}" @click="showSet(1)">
                <div class="info-item-icon">
                    <img src="@/assets/userInfo.png" alt="">
                </div>
                <div class="info-item-title">
                    个人资料
                </div>
            </div>
            <div class="setting-title-item" :class="{'active':activeIdx == 2}" @click="showSet(2)">
                <div class="info-item-icon">
                    <img src="@/assets/userInfo.png" alt="">
                </div>
                <div class="info-item-title">
                    登录密码
                </div>
            </div>
            <div class="setting-title-item" :class="{'active':activeIdx == 3}" @click="showSet(3)">
                <div class="info-item-icon">
                    <img src="@/assets/userInfo.png" alt="">
                </div>
                <div class="info-item-title">
                    安全密码
                </div>
            </div>
            <div class="setting-title-item" :class="{'active':activeIdx == 4}" @click="showSet(4)">
                <div class="info-item-icon">
                    <img src="@/assets/gx.png" alt="">
                </div>
                <div class="info-item-title">
                    检测更新
                </div>
            </div>
        </div>
        <div class="setting-box-content">
            <update-box v-if="activeIdx == 4"></update-box>

        </div>
    </div>

</div>
</template>

<script>
import UpdateBox from "./update";
export default {
    components: {
        UpdateBox,
    },
    data() {
        return {
            activeIdx: 1

        }
    },
    mounted() {

    },
    methods: {
        showSet(type) {
            this.activeIdx = type;
        }
    },
}
</script>

<style lang="scss" scoped>
.settting-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;

    .settting-box-mark {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;
    }

    .settting-box-cent {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: .5s);
        display: flex;

        .setting-box-title {
            padding-top: 50px;
            box-sizing: border-box;
            width: 250px;
            height: 100%;
            background: #f1f1f4;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            h3 {
                margin-bottom: 20px;
                font-size: 26px;
                padding-left: 20px;
                box-sizing: border-box;
            }

            .setting-title-item {
                padding: 20px;
                box-sizing: border-box;
                border-bottom: 1px solid #ddd;
                display: flex;
                align-items: center;
                cursor: pointer;

                &:hover {
                    color: #999;
                }

                .info-item-icon {
                    margin-right: 10px;

                    img {
                        width: 20px;
                    }

                    i {
                        font-size: 20px;
                    }
                }

                .info-item-title {
                    font-size: 16px;
                }

                &.active {
                    background: #fff;
                }
            }

        }

        .setting-box-content {
            flex: 1;
        }
    }
}
</style>
