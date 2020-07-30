<template>
  <div id="app">
    <h1>router-view</h1>
    <el-button>默认按钮</el-button>
<!--    <router-view></router-view>-->
  </div>
</template>

<script>
import "@/reset.less";
export default {
  name: 'App',
  mounted () {
    this.$message.info('其他')
  }
}
</script>

<style>
#app {
  font-family: Microsoft YaHei, "微软雅黑", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
