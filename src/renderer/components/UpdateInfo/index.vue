<template>
<div class="update-info">
    <div class="update-info-mark" @click="hideBox"></div>

    <div class="update-info-cent">
        <div class="update-info-close" @click="hideBox">
            <i class="el-icon-close"></i>
        </div>
        <div class="update-cent-title">
            <div class="avatar online">
                <div class="no-avatar">
                    <i class="el-icon-camera"></i>
                </div>
            </div>
        </div>
        <div class="update-cent-name">
            <input type="text" v-model="name" ref="inputName" @focus="inFocus = true" @blur="inFocus = false">
            <i class="el-icon-check update-name-icon" v-if="inFocus"></i>
            <i class="el-icon-edit update-name-icon" v-if="!inFocus" @click="$refs.inputName.focus()"></i>
        </div>
        <div class="update-cent-item">
            <div class="update-item-title">
                <i class="el-icon-user"></i>
                <span>账号</span>
            </div>
            <div class="update-item-cent">
                Ace001
            </div>
        </div>
        <div class="update-cent-item">
            <div class="update-item-title">
                <i class="el-icon-s-finance"></i>
                <span>名片</span>
            </div>
            <div class="update-item-cent" @click="isShowQRCode = true">
                <img src="@/assets/qr-code.png" alt="" srcset="">
            </div>
        </div>
        <div class="update-cent-item">
            <div class="update-item-title">
                <i class="el-icon-collection-tag"></i>
                <span>签名</span>
            </div>
            <div class="update-item-cent">
                Ace001Ace001Ace001Ace001Ace001Ace001Ace001Ace001Ace001Ace001Ace001Ace001Ace001
            </div>
        </div>
        <div class="update-cent-item">
            <div class="update-item-title">
                <i class="el-icon-female"></i>
                <span>性别</span>
            </div>
        </div>
        <div class="update-cent-item">
            <div class="update-item-title">
                <i class="el-icon-date"></i>
                <span>生日</span>
            </div>
        </div>
        <div class="update-cent-item">
            <div class="update-item-title">
                <i class="el-icon-map-location"></i>
                <span>地区</span>
            </div>
        </div>
    </div>

    <transition name="el-zoom-in-top">
        <div class="qr-code" v-if="isShowQRCode">
            <div class="qr-code-mark" @click="isShowQRCode = false"></div>

            <div class="qr-code-cent">
                <div class="qr-code-close" @click="isShowQRCode = false">
                    <i class="el-icon-close"></i>
                </div>
                <div id="capture">
                    <div class="qr-code-avatar">
                        <img src="https://nllmjs.com/attachments/zzx/2020/9/20/0_1600589673414461171.png" alt="" />
                        <span>CA、宝贝Tony马</span>
                    </div>
                    <img class="qr-code-img" src="@/assets/qr-code.png" alt="">
                    <p>扫一扫上面二维码加我</p>
                </div>
                <div class="qr-code-btn">
                    <el-button type="primary" @click="saveQRCode">保存到本地</el-button>
                </div>
            </div>

        </div>
    </transition>
</div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
    data() {
        return {
            name: 'CA、宝贝Tony马',
            inFocus: false,
            isShowQRCode: false

        };
    },
    mounted() {

    },
    methods: {
        hideBox() {
            this.$emit('hideInfoBox', true)
        },
        saveQRCode() {
            let _this = this;
            let msg = this.$message({
                message: '图片处理中...',
                type: 'warning',
                duration: 0
            });
            html2canvas(document.querySelector("#capture"), {
                useCORS: true,
                logging: true
            }).then(canvas => {
                console.log(canvas);
                let imgUrl = canvas.toDataURL("image/png");
                let imgName = "QRCode-" + new Date().getTime();
                msg.close();
                this.downloadIamge(imgUrl, imgName);

            });
        },
        downloadIamge(imgsrc, name) { //下载图片地址和图片名
            var image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            console.log(123);
            image.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                var a = document.createElement("a"); // 生成一个a元素
                var event = new MouseEvent("click"); // 创建一个单击事件
                a.download = name || "photo"; // 设置图片名称
                a.href = url; // 将生成的URL设置为a.href属性
                a.dispatchEvent(event); // 触发a的单击事件

            };
            image.src = imgsrc;
        },

    },
};
</script>

<style lang="scss" scoped>
.update-info {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;

    .update-info-mark {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .5);

    }

    .update-info-cent {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        height: 600px;
        background: #fff;
        border-radius: 5px;

        .update-info-close {
            position: absolute;
            left: 25px;
            top: 15px;
            font-size: 24px;
            color: #fff;
            cursor: pointer;

            &:hover {
                color: #ccc;
            }

        }

        .update-cent-title {
            width: 100%;
            height: 125px;
            background: linear-gradient(45deg, #317ace, #52baed);
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;

            .avatar {
                position: absolute;
                left: 50%;
                top: 23px;
                transform: translate(-50%, 0);
                width: 120px;
                height: 120px;
                border-radius: 50%;

                &.online {
                    position: relative;

                    &::before {
                        content: '';
                        position: absolute;
                        right: 6px;
                        bottom: 6px;
                        width: 22px;
                        height: 22px;
                        border: 3px solid #fff;
                        background: #39cc7e;
                        border-radius: 50%;
                    }
                }

                .no-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    font-size: 50px;
                    color: #333;
                    background: #f1f1f4;
                    text-align: center;
                    line-height: 120px;
                    cursor: pointer;

                }
            }

        }

        .update-cent-name {
            margin: 25px 50px;
            position: relative;

            input {
                padding: 5px;
                box-sizing: border-box;
                font-size: 24px;
                color: #333;
                font-weight: bolder;
                text-align: center;
                width: 100%;
                border: 0;
                cursor: pointer;

                &:focus {
                    border-bottom: 1px solid #ddd !important;
                    cursor: text;
                }

                &:hover {
                    color: #666;
                }
            }

            .update-name-icon {
                position: absolute;
                right: -30px;
                top: 4px;
                font-size: 26px;
                color: #999;
                cursor: pointer;

                &:hover {
                    color: #333;
                }
            }
        }

        .update-cent-item {
            margin: 10px 15px;
            padding: 10px 0;
            box-sizing: border-box;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;

            .update-item-title {
                font-size: 16px;
                color: #333;

                i {
                    vertical-align: middle;
                    margin-right: 10px;
                    font-size: 24px;
                }

                span {
                    vertical-align: middle;
                }
            }

            .update-item-cent {
                padding-left: 40px;
                box-sizing: border-box;
                flex: 1;
                text-align: right;
                color: #666;
                font-size: 16px;
                cursor: pointer;
                overflow: hidden;
                word-break: keep-all;
                text-overflow: ellipsis;

                &:hover {
                    color: #333;

                    img {
                        opacity: .9;
                    }
                }

                img {
                    width: 20px;
                    opacity: .6;
                }
            }
        }
    }

    .qr-code {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 101;
        width: 100%;
        height: 100%;

        .qr-code-mark {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: transparent;

        }

        .qr-code-cent {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            .qr-code-close {
                position: absolute;
                right: 25px;
                top: 15px;
                font-size: 24px;
                color: #666;
                cursor: pointer;

                &:hover {
                    color: #000;
                }
            }

            #capture {
                width: 300px;
                height: 450px;
                background: #fff;
                box-shadow: 0 0 10px rgba($color: #000000, $alpha: .5);
                border-radius: 10px;
                padding: 20px 30px;
                box-sizing: border-box;

                .qr-code-avatar {
                    margin: 10px 0;

                    img {
                        vertical-align: middle;
                        width: 50px;
                        border-radius: 50%;
                    }

                    span {
                        margin-left: 10px;
                        vertical-align: middle;
                        font-size: 14px;
                        color: #333;
                    }
                }

                .qr-code-img {
                    width: 100%;
                }

                p {
                    margin-top: 10px;
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                }
            }

        }

        .qr-code-btn {
            position: absolute;
            bottom: 30px;
            width: 100%;
            height: 40px;
            text-align: center;
        }

    }
}
</style>
