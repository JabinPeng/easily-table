<template>
  <!-- 单个配置项 -->
  <div class="config-item">
    <div class="main-config">
      <span class="name">{{ config.name }}</span>
      <!-- 颜色选择 -->
      <color-picker
        v-show="config.type === 'color'"
        v-model="config.value"
      ></color-picker>
      <!-- 透明度 -->
      <el-input-number
        controls-position="right"
        class="input-item"
        :max="100"
        :min="0"
        v-show="config.type === 'opacity'"
        v-model="config.value"
      ></el-input-number>
    </div>
    <div class="other-config"></div>
  </div>
</template>
<script>
import ColorPicker from "@comp/ConfigItem/ColorPicker";
export default {
  components: { ColorPicker },
  props: {
    value: { type: Object, default: () => {} },
  },
  watch: {
    config: {
      handler: function() {
        this.$emit("input", this.config);
      },
      deep: true,
    },
  },
  data() {
    return {
      config: this.value,
    };
  },
  mounted() {
    // console.log(this.value);
  },
};
</script>
<style lang="less" scoped>
.config-item {
  padding: 1vh 1vw;

  border-bottom: 1px solid #dadce0;
  .input-item {
    width: 4.8vw;
  }

  .main-config {
    min-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 0.8vw;
    }
  }
}
</style>
