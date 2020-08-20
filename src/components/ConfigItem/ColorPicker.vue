<template>
  <div class="color-picker">
    <span
      class="color-block"
      :style="{ background: hex }"
      @click="pickerVisibleHandle"
    ></span>
    <color-picker
      v-model="colors"
      class="picker"
      v-show="pickerVisible"
      @ok="onOk"
      @cancel="onCancel"
    ></color-picker>
  </div>
</template>
<script>
import { Photoshop } from "vue-color";
var colors = {
  hex: "#194d33",
};
export default {
  components: { "color-picker": Photoshop },
  props: {
    value: {
      type: [String, Number],
      default: "white",
    },
  },
  data() {
    return {
      colors,
      hex: this.value,
      pickerVisible: false,
    };
  },
  methods: {
    pickerVisibleHandle() {
      this.pickerVisible = !this.pickerVisible;
      if (this.pickerVisible) {
        this.colors.hex = this.hex;
      }
    },
    onOk() {
      this.pickerVisible = false;
      this.hex = this.colors.hex;
      this.$emit("input", this.hex);
    },
    onCancel() {
      this.pickerVisible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.color-picker {
  .color-block {
    display: block;
    width: 4.8vw;
    height: 2.5vh;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid #dadce0;
  }
  .picker {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
