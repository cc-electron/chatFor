<template>
<div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
        <app-main></app-main>
    </div>
</div>
</template>

<script>
import {
    Sidebar,
    AppMain
} from './components'

export default {
    name: 'layout',
    components: {
        Sidebar,
        AppMain
    },
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
