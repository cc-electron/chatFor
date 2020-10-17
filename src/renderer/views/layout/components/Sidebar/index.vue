<template>
<div>
    <div class="userInfo">
        <div class="user-desc">
            <div class="avatar online" @click="showInfoBox = true">
                <img src="https://nllmjs.com/attachments/zzx/2020/9/20/0_1600589673414461171.png" alt="" />
            </div>
            <p class="user-name" @click="showInfoBox = true">CA、宝贝Tony马</p>
            <div class="user-more">
                <img src="@/assets/more.png" alt="" />
            </div>
        </div>
        <div class="search">
            <div class="search-box">
                <img src="@/assets/ss.png" alt="" />
                <input type="text" placeholder="会话、联系人" />
            </div>
        </div>
        <div class="chat-tab">
            <div class="tab-item">
                <div @click="changeTab(1)" :class="{'tab-active':tabActive == 1}">
                    <img src="@/assets/tab_x_x.png" alt="" v-if="tabActive != 1" />
                    <img src="@/assets/tab_x_m.png" alt="" v-if="tabActive == 1">
                    <p>消息</p>
                </div>
            </div>
            <div class="tab-item">
                <div @click="changeTab(2)" :class="{'tab-active':tabActive == 2}">
                    <img src="@/assets/tab_l_m.png" alt="" v-if="tabActive != 2" />
                    <img src="@/assets/tab_l_x.png" alt="" v-if="tabActive == 2" />
                    <p>好友</p>
                </div>
            </div>
            <div class="tab-item">
                <div @click="changeTab(3)" :class="{'tab-active':tabActive == 3}">
                    <img src="@/assets/chat.png" alt="" v-if="tabActive != 3" />
                    <img src="@/assets/chat_light.png" alt="" v-if="tabActive == 3" />
                    <p>群聊</p>
                </div>
            </div>
        </div>
    </div>
    <div class="chat-list">
        <session-list v-if="tabActive == 1"></session-list>
        <friends v-if="tabActive == 2"></friends>
    </div>
    <info-box @hideBox="hideBox" @showBox="showBoxFunc" v-show="showInfoBox"></info-box>
    <update-info @hideInfoBox="hideInfoBox" v-show="showUpdateInfoBox"></update-info>
    <setting-box v-show="showSettingBox"></setting-box>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";

import SessionList from "./SessionList";
import Friends from "./Friends";
import InfoBox from "./InfoBox";
import UpdateInfo from "@/components/UpdateInfo";
import SettingBox from "@/components/Setting";

export default {
    components: {
        SidebarItem,
        ScrollBar,
        SessionList,
        Friends,
        InfoBox,
        UpdateInfo,
        SettingBox
    },
    computed: {
        ...mapGetters(["sidebar"]),
        routes() {
            return this.$router.options.routes;
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
    },
    data() {
        return {
            tabActive: 1,
            showInfoBox: false,
            showUpdateInfoBox: false,
            showSettingBox: false
        };
    },
    mounted() {
        console.log(this.routes, "routes");
        console.log(this.sidebar, "sidebar");
        console.log(this.$router.options, "$router");
    },
    methods: {
        changeTab(type) {
            this.tabActive = type;
            console.log(this.tabActive)

        },
        hideBox() {
            this.showInfoBox = false
        },
        showBoxFunc(type) {
            switch (type) {
                case 'info':
                    this.showUpdateInfoBox = true;
                    break;
                case 'set':
                    this.showSettingBox = true;
                    break;

            }
        },
        hideInfoBox() {
            this.showUpdateInfoBox = false;
        }
    },
};
</script>
