<template>
  <!-- 单个配置项 -->
  <div class="config-item">
    <div class="main-config">
      <span class="name">
        {{ config.name }}
        <span v-if="config.unit">({{ config.unit }})</span>
      </span>

      <!-- 颜色选择 -->
      <color-picker
        v-if="config.type === 'color' || config.type === 'borderColor'"
        v-model="config.value"
      ></color-picker>
      <!-- 透明度 -->
      <el-input-number
        controls-position="right"
        class="input-item"
        :max="1"
        :step="0.1"
        :min="0"
        v-if="config.type === 'opacity'"
        v-model="config.value"
      ></el-input-number>
      <!-- 粗细 -->
      <el-input-number
        controls-position="right"
        class="input-item"
        :min="0"
        v-if="config.type === 'borderWidth'"
        v-model="config.value"
      ></el-input-number>
      <!-- 线条宽度 -->
      <el-select
        class="input-item"
        v-if="config.type === 'borderStyle'"
        v-model="config.value"
      >
        <el-option
          v-for="item in fontStyle"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 字体 -->
      <el-select
        class="input-item"
        v-if="config.type === 'fontFamily'"
        v-model="config.value"
      >
        <el-option
          v-for="item in fontFamilies"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 粗细 -->
      <el-input-number
        controls-position="right"
        class="input-item"
        :min="0"
        v-if="config.type === 'fontSize'"
        v-model="config.value"
      ></el-input-number>
      <!-- 对齐方式 -->
      <el-select
        class="input-item"
        v-if="config.type === 'textAlign'"
        v-model="config.value"
      >
        <el-option
          v-for="item in textAlign"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!--字体加粗-->
      <el-select
        class="input-item"
        v-if="config.type === 'fontWeight'"
        v-model="config.value"
      >
        <el-option
          v-for="item in fontWeight"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 宽高,位置 -->
      <el-input-number
        controls-position="right"
        class="input-item"
        :min="0"
        v-if="
          config.type === 'x' ||
            config.type === 'y' ||
            config.type === 'width' ||
            config.type === 'height'
        "
        v-model="config.value"
      ></el-input-number>
    </div>
    <div
      class="other-config"
      v-if="config.attributes && config.attributes.length > 0"
    >
      <config-item
        v-model="config.attributes[index]"
        v-for="(item, index) in config.attributes"
        :key="index"
      ></config-item>
    </div>
  </div>
</template>
<script>
import ColorPicker from "@comp/ConfigItem/ColorPicker";
import materialConfig from "./material.config";

export default {
  name: "ConfigItem",
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
      ...materialConfig,
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
  /deep/ .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  /deep/ .el-input__icon {
    line-height: 30px;
  }
  /deep/ .el-input-number__increase {
    top: 5px;
    line-height: 15px;
  }
  /deep/.el-input-number__decrease {
    top: unset;
    line-height: 15px;
    bottom: 5px;
  }

  .input-item {
    width: 6vw;
    min-width: 100px;
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
  .other-config {
    .config-item {
      padding-right: 0;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
