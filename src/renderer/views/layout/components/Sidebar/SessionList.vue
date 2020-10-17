<template>
<div class="session-list">
    <div class="add-chat" :class="{'border-style':chatListScroll > 0}">
        <div class="add-chat-btn">
            <img src="@/assets/add_chat.png" alt="">
             新建聊天
        </div>
    </div>
    <div class="session-chat-list">
        <ul id="list" @scroll="scrollEvent">
            <li class="active">
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                    <p class="number">90</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <!-- <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt=""> -->
                    <p>改变</p>

                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>

            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>
            <li>
                <div class="chat-avatar">
                    <img src="https://bambooinc.net/assets/img/soft-custom.svg" alt="">
                </div>
                <div class="chat-desc">
                    <h6>改变世界群</h6>
                    <p>我们一起改变世界我们一起改变世界我们一起改变世界</p>
                </div>
                <div class="chat-time">
                    <p class="time">昨天</p>
                </div>
            </li>

        </ul>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            tabActive: 1,
            chatListScroll: 0

        };
    },
    mounted() {

    },
    methods: {
        scrollEvent() {
            let _this = this
            let read = _this.$el.querySelector('#list')
            this.chatListScroll = read.scrollTop;
        },

    },
};
</script>

<style lang="scss" scoped>
.session-list {
    position: relative;
    height: 100%;

    .add-chat {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;

        .add-chat-btn {
            width: 100%;
            height: 32px;
            font-size: 12px;
            border: 1px solid #ddd;
            border-radius: 20px;
            background: #fff;
            text-align: center;
            line-height: 32px;
            cursor: pointer;
            img{
                width: 18px;
                vertical-align: middle;
            }

        }

        &.border-style {
            box-shadow: 0 2px 2px rgba($color: #000000, $alpha: .1);
        }

    }

    .session-chat-list {
        height: 100%;
        padding-top: 52px;
        box-sizing: border-box;

        ul {
            height: calc(100% - 153px);
            overflow-y: auto;

            li {
                // height: 1000px;
                display: flex;
                padding: 15px 10px;
                box-sizing: border-box;

                &.active {
                    background: #fff !important;
                }

                &:hover {
                    cursor: pointer;
                    background: #eaeaea;
                }

                .chat-avatar {
                    width: 35px;
                    height: 35px;

                    img {
                        width: 100%;
                        border-radius: 50%;
                    }

                    p {
                        border-radius: 50%;
                        width: 35px;
                        height: 35px;
                        font-size: 12px;
                        color: #2d81ff;
                        background: #e5e4e8;
                        font-weight: bold;
                        text-align: center;
                        line-height: 35px;
                    }
                }

                .chat-desc {
                    margin-left: 10px;
                    flex: 1;
                    align-items: center;

                    h6 {
                        font-size: 14px;
                        color: #2b2c33;
                        font-weight: 500;

                    }

                    p {
                        margin-top: 5px;
                        font-size: 14px;
                        color: #999;
                        overflow: hidden;
                        width: 210px;
                        word-break: keep-all;
                        text-overflow: ellipsis;
                    }
                }

                .chat-time {
                    text-align: right;

                    .time {
                        font-size: 13px;
                        color: #666;
                    }

                    .number {
                        display: inline-block;
                        padding: 2px 5px;
                        box-sizing: border-box;
                        margin-top: 5px;
                        font-size: 12px;
                        background: #f56c6c;
                        border-radius: 10px;
                        text-align: center;
                        color: #fff;
                        font-weight: bold;
                    }
                }

            }
        }

    }

}
</style>
