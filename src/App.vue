<template>
  <div id="app">
    <EasilyTable></EasilyTable>
  </div>
</template>

<script>
import EasilyTable from "./components/EasilyTable/Index";
import { httpAction } from "./mock/api";

export default {
  name: "App",
  components: {
    EasilyTable
  },
  mounted () {
    httpAction('list', 'get').then((res) => {
      console.log(res)
    })
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
