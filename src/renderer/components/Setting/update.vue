<template>
<div class="update-box">
    <img src="@/assets/icon_logo.png" class="logo" alt="">
    <h3>超信</h3>
    <h5>你使用的是超信最新版本。</h5>
    <p class="copy">&copy; 2020</p>

</div>
</template>

<script>
export default {
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
.update-box {
    text-align: center;
    background: #fff;
    position: relative;
    height: 100%;

    .logo {
        margin-top: 40px;
        width: 80px;
    }

    h3 {
        margin-top: 20px;
        font-size: 20px;
    }

    h5 {
        margin-top: 12px;
        font-size: 14px;
    }

    .copy {
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translate(-50%, 0);
        font-size: 12px;
        color: #999;
    }
}
</style>
