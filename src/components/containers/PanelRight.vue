<template>
  <CardBox
    placement="right"
    position="left"
    :width="360"
    @expand="toggleHandler"
    class="panel-right"
  >
    <el-tabs type="card">
      <el-tab-pane
        :label="item.label"
        v-for="(item, index) in materialConfig"
        :key="index"
      >
        <config-item
          v-for="(config, idx) in item.properties"
          v-model="materialConfig[index].properties[idx]"
          :key="idx"
        ></config-item>
      </el-tab-pane>
    </el-tabs>
  </CardBox>
</template>

<script>
import CardBox from "@comp/containers/CardBox";
import ConfigItem from "@comp/ConfigItem/Index";
import config from "@/config/material";
console.log(config)

export default {
  name: "PanelRight",
  components: {
    CardBox,
    ConfigItem,
  },
  props: {
    editorConfig: Object,
    toolList: Array,
    currentItem: Array,
  },
  computed: {},
  data() {
    return {
      materialConfig: config.DOM,
    };
  },
  watch: {
    materialConfig: {
      handler: function() {
        console.log(this.materialConfig, "右侧 config 更新");
      },
      deep: true,
    },
  },
  methods: {
    toggleHandler(data) {
      const _t = this;
      _t.$bus.$emit("editor/panel/toggle", data);
    },
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
/** * PanelRight 右侧面板 */

.panel-right {
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border-radius: 0;
    width: 100%;
  }
  /deep/ .el-tabs__item {
    border-radius: 0;
    width: 33.3333%;
    padding: 0;
    text-align: center;
  }
  /deep/
    .el-tabs--top.el-tabs--card
    > .el-tabs__header
    .el-tabs__item:nth-child(2),
  /deep/
    .el-tabs--top.el-tabs--card
    > .el-tabs__header
    .el-tabs__item:last-child {
    padding-left: 0;
  }
  /deep/ .el-tabs__header {
    margin: 0;
  }
}
</style>
