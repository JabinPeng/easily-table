<template>
  <a-modal v-model="visible" :title="title" centered :footer="null">
    <a-form layout="horizontal" label-align="left">
      <a-row type="flex" :justify="justify" class="login-form">
        <a-col :span="colSpan" v-for="(item, index) in fields" :key="index">
          <!-- has-feedback -->
          <a-form-item
            :label="item.label"
            :label-col="{ span: item.labelCol ? item.labelCol: 8 }"
            :wrapper-col="{ span: item.wrapperCol ? item.wrapperCol : 16 }"
            :validate-status="item.status"
            :help="item.message"
          >
            <!-- 输入框 -->
            <a-input
              v-model="form[index].value"
              :disabled="item.disabled"
              @change="changeHandler(index, form[index].key, form[index].value)"
              :placeholder="item.placeholder"
              v-if="item.type === undefined || item.type === 'input'"
            />

            <!-- 数字输入框 -->
            <input
              type="number"
              v-model="form[index].value"
              class="input-number"
              :placeholder="item.placeholder"
              @change="changeHandler(index, form[index].key, form[index].value)"
              :min="item.min === undefined ? item.min : ''"
              v-else-if="item.type === 'number'"
            />

            <!-- 密码输入框 -->
            <a-input-password
              v-model="form[index].value"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              @change="changeHandler(index, form[index].key, form[index].value)"
              v-else-if="item.type === 'password'"
            />

            <!-- 多选 -->
            <a-checkbox-group
              v-model="form[index].value"
              :options="item.options"
              @change="changeHandler(index, form[index].key, form[index].value)"
              :disabled="item.disabled"
              v-else-if="item.type === 'checkbox'"
            />

            <!-- 单选 -->
            <a-radio-group
              v-model="form[index].value"
              :options="item.options"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              @change="changeHandler(index, form[index].key, form[index].value)"
              v-else-if="item.type === 'radio'"
            />

            <!-- 下拉选择 -->
            <a-select
              :allow-clear="true"
              v-else-if="item.type === 'select'"
              v-model="form[index].value"
              :placeholder="item.placeholder"
              @change="changeHandler(index, form[index].key, form[index].value)"
            >
              <a-select-option
                :value="selectItem.value"
                v-for="selectItem in item.options"
                :key="selectItem.key"
              >
                {{ selectItem.key }}
              </a-select-option>
            </a-select>

            <!-- 树结构 -->
            <a-tree
              class="tree-node"
              v-else-if="item.type === 'tree'"
              checkable
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :checked-keys="form[index].value"
              :tree-data="item.options"
              @expand="onExpand"
              @check="res => onCheck(res, index, item.options)"
            />
          </a-form-item>
        </a-col>

        <a-col span="24">
          <div
            style="text-align:right;width:100%;border-top:1px solid #E8E8E8; padding:15px 0;margin-top:15px;"
          >
            <a-button
              type="default"
              style="margin-right:15px"
              @click="visible = false"
            >
              取消
            </a-button>
            <a-button @click="okHandle" type="primary">
              确定
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  props: {
    title: {
      type: String,
      default: "操作"
    },
    value: {
      type: Boolean,
      default: false
    },
    justify: {
      type: String,
      default: 'space-between'
    },
    colSpan: {
      type: Number,
      default: 24
    },
    fields: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    form: function() {
      return this.fields;
    }
  },
  data() {
    return {
      replaceFields: { children: "children", title: "title", key: "path" },
      visible: this.value,
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: []
    };
  },
  watch: {
    visible: function(val) {
      this.$emit("input", val);
    },
    value: function(val) {
      this.visible = val;
    }
  },
  mounted() {},
  methods: {
    // 数据变化
    changeHandler(index, key, value) {
      this.$emit("change", index, key, value, this.form);
    },
    // 确定
    okHandle: function() {
      const { form } = this;
      const obj = {};
      const _ = this;

      let validateStatus = true;

      form.map((item, index) => {
        const dataKey = item;
        const value = item.value;

        if (
          item.required &&
          (value === "" || value === undefined || value === null)
        ) {
          _.$set(dataKey, "status", "error");
          _.$set(dataKey, "message", "请填写" + item.title);
          validateStatus = false;
        } else {
          _.$set(dataKey, "status", "success");
          _.$set(dataKey, "message", "");
        }
        obj[item.dataIndex] = item.value;
      });

      if (validateStatus) {
        this.$emit("confirm", obj);
      }
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys, index) {
      this.checkedKeys = checkedKeys;
      this.form[index].value = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      this.selectedKeys = selectedKeys;
    }
  }
};
</script>
<style lang="less" scoped>
.tree-node {
  max-height: 400px;
  overflow: auto;
}
.input-number {
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}
.input-number:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: 0;
  -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
</style>
