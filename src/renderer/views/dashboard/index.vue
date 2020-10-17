<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{names}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roless' :key='role'>{{role}}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data(){
    return{
        names: 'admin',
        roless: ['admin']
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    let name = this.name 
    let roles = this.roles

    // this.avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    // this.name = "admin"
    console.log(name,roles)
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
   
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
