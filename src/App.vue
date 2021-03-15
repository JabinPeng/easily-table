<template>
  <div id="app">
    <EasilyTable></EasilyTable>
  </div>
</template>

<script>
import EasilyTable from "./components/EasilyTable/Index";

export default {
  name: "App",
  components: {
    EasilyTable
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
