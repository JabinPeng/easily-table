<template>
  <div class="wrapper">
    <div class="opt-list">
      <div class="left">
        <template v-if="showFilter">
          <table-query-filter
            :filters="tagsFilter"
            @change="queryChangeHandle"
          />
        </template>
      </div>

      <div class="right">
        <!-- 操作栏 -->
        <template v-for="(item, index) in pageOptions">
          <!-- 上传 -->
          <a-upload
            style="display:inline-block;"
            :custom-request="file => customRequestHandle(file, index)"
            v-if="item.buttonType === 'file'"
            :show-upload-list="false"
            :key="index"
          >
            <a-button
              :icon="item.icon"
              :type="item.type"
              class="opt-btn"
              style="width:80px;margin-right:1rem;"
              :title="item.title"
            >
              {{ item.title }}
            </a-button>
          </a-upload>
          <!-- 其他 -->
          <a-button
            class="opt-btn"
            v-else
            :type="item.type"
            :icon="item.icon"
            @click="handler(index, 'page', '', '')"
            :key="index"
          >
            {{ item.title }}
          </a-button>
        </template>
      </div>
    </div>

    <!-- 表格 -->
    <a-table
      style="margin-bottom:1rem;"
      bordered
      :columns="columns"
      :data-source="data"
      :scroll="scroll"
      @change="paginationChange"
      :pagination="
        pagination
          ? {
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: pageSizeOptions,
              ...paginationConfig
            }
          : false
      "
      :row-key="
        (record, index) => {
          return index;
        }
      "
    >
      <!-- 传入节点 -->
      <template
        :slot="slotName"
        slot-scope="text, record, index"
        v-for="slotName in customRenders"
      >
        <slot :name="slotName" :text="text" :record="record" :index="index" />
      </template>

      <template slot="action" slot-scope="text, record, index">
        <template v-for="(item, idx) in rowOptions">
          <!-- 普通按钮 -->
          <a-button
            v-if="!item.showConfirm"
            :icon="item.icon"
            :type="item.type"
            style="margin-right:10px;"
            :title="item.title"
            :key="idx"
            size="small"
            @click="handler(idx, 'row', record, index)"
          >
            {{ item.showTitle ? item.title : "" }}
          </a-button>
          <!-- 确定框 -->
          <a-popconfirm
            v-else
            :title="`确定${item.title}吗?`"
            ok-text="确定"
            cancel-text="取消"
            @confirm="handler(idx, 'row', record, index)"
            :key="idx"
          >
            <a-button
              :icon="item.icon"
              :type="item.type"
              style="margin-right:10px;"
              :title="item.title"
              size="small"
            >
              {{ item.showTitle ? item.title : "" }}
            </a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <!-- 弹窗 -->
    <CustomForm
      :fields="currentForm"
      @confirm="okHandle"
      v-model="visible"
      :title="title"
      @change="changeHandler"
    />
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import clonedeep from "lodash.clonedeep";
import TableQueryFilter from "@/components/TableQueryFilter/index";
import CustomForm from "@/components/CustomForm/Index";

// 判断是否异步方法
function hasAsyncFunction(functionInstance) {
  const AsyncFunction = (async () => {}).constructor;
  return functionInstance instanceof AsyncFunction === true;
}

export default {
  components: { TableQueryFilter, CustomForm },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    // 排序
    showSorter: {
      type: Boolean,
      default: false
    },
    // 过滤
    showFilter: {
      type: Boolean,
      default: true
    },
    // 分页
    pagination: {
      type: Boolean,
      default: false
    },
    // 表格滚动宽高
    width: {
      type: [Number, String],
      default: "1400"
    },
    // 表单标题
    title: {
      type: String,
      default: "操作"
    },
    // 显示工厂
    showFactory: {
      type: Boolean,
      default: true
    },
    // 列
    columns: {
      type: Array,
      default: () => []
    },
    // 筛选
    tagsFilter: {
      type: Array,
      default: () => [
        // { title: '流水号', dataIndex: 'id', key: 'ID' },
      ]
    },
    // 列表查询接口参数
    dataApiParams: {
      type: Object,
      default: () => {}
    },
    // 表格数据api
    dataApi: {
      type: [Boolean, Function],
      default: false
    },
    // 行编辑
    rowOptions: {
      type: Array,
      default: () => []
    },
    // 页面编辑
    pageOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      buttonIndex: null,
      customRenders: [],
      fields: {},
      currentForm: [],
      currentFormConfig: null,
      visible: false,
      tuggerVisible: false,
      factory: "",
      factories: ["1500", "1600"],
      data: this.dataSource,
      currLablInfo: {},
      filters: [],
      pageSizeOptions: ["10", "20", "50", "100"],
      paginationConfig: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      cacheData: {}
    };
  },
  beforeMount() {
    const { columns } = this;
    const customRenders = [];
    columns.map(item => {
      // 获取自定义节点
      if (item.scopedSlots && item.scopedSlots.customRender) {
        customRenders.push(item.scopedSlots.customRender);
      }
      // 固定
      if (item.dataIndex === "action") {
        this.$set(item, "fixed", "right");
      } else {
        // 排序
        const dataIndex = item.dataIndex;
        // 默认排序
        if (item.sorter === undefined) {
          this.$set(item, "sorter", (a, b) => {
            return a[dataIndex] < b[dataIndex] ? 1 : -1;
          });
        }
      }
    });
    const index = customRenders.findIndex(item => item === "action");
    index !== -1 && customRenders.splice(index, 1);
    this.customRenders = customRenders;

    this.factory = this.factories[0];
  },
  computed: {
    scroll: function() {
      return {
        x: this.width
      };
    }
  },
  created() {},
  watch: {
    visible: function(val) {
      if (!val) {
        this.currentForm = [];
        this.currentFormConfig = {};
      }
    },
    dataSource: function(val) {
      this.data = val;
    }
  },
  mounted() {
    this.renderTableData();
  },
  methods: {
    // 表单改变事件
    changeHandler(index, key, value, form) {
      const record = this.record;
      const formItem = form[index];
      const { change } = formItem;
      change &&
        typeof change === "function" &&
        change(record, index, key, value, form);
    },
    // 分页事件
    paginationChange(pagination, filters, sorter) {
      const { paginationConfig } = this;
      const { current, pageSize } = pagination;

      // 过滤、排序改变不刷新数据，当前页、页码改变刷新数据
      if (
        paginationConfig.current !== current ||
        paginationConfig.pageSize !== pageSize
      ) {
        this.paginationConfig.current = current;
        this.paginationConfig.pageSize = pageSize;
        this.renderTableData();
      }
    },
    // 文件上传
    customRequestHandle(file, index) {
      const item = this.pageOptions[index];
      const { api, refresh, beforeRequest } = item;
      const params = beforeRequest ? beforeRequest(file.file, index) : {};

      api &&
        api(params).then(res => {
          if (res.success) this.$message.success(res.message);
          refresh && this.renderTableData();
        });
    },
    // 弹窗确定
    okHandle(record) {
      const {
        api,
        params,
        refresh,
        callback,
        beforeRequest
      } = this.currentFormConfig;

      let _params = {};
      if (params) {
        Object.keys(params).map(key => {
          _params[key] = record[params[key]];
        });
      } else {
        _params = record;
      }

      // 调用接口前处理参数
      if (beforeRequest) {
        _params = beforeRequest(
          _params,
          this.buttonIndex,
          this.record,
          this.rowIndex
        );
        if (!_params) {
          this.$message.warning("请正确填写信息！");
          return false;
        }
      }

      api &&
        api(_params).then(res => {
          if (res.success) {
            this.visible = false;
            this.currentFormConfig.formFields = [];
            this.$message.success(res.message);
            callback && callback(res);
            refresh && this.renderTableData();
          }
        });
    },
    // 按钮点击
    async handler(index, type, record, rowIndex) {
      const source = type === "page" ? "pageOptions" : "rowOptions";
      const config = this[source][index];
      this.buttonIndex = index;

      this.currentFormConfig = clonedeep(config);
      this.currentForm = [];

      const {
        api,
        params,
        refresh,
        formFields,
        showDailog,
        callback,
        beforeRequest,
        before
      } = config;

      // 点击后 调用前接口前
      if (before) {
        if (hasAsyncFunction(before)) {
          await before(record, formFields);
        } else {
          before(record, formFields);
        }
      }

      // 有弹窗
      if (showDailog && formFields) {
        this.visible = true;
        this.record = record;
        this.rowIndex = rowIndex;

        formFields.map((item, _index) => {
          const idx = this.columns.findIndex(
            col => item.dataIndex === col.dataIndex
          );
          // 行编辑
          if (type === "row") {
            let val = this.record[item.dataIndex];

            switch (item.type) {
              case "checkbox":
                val =
                  val === undefined || val === null || val === "" ? "" : val;
                this.$set(
                  item,
                  "value",
                  val instanceof Array ? val : val.split(",")
                );
                break;

              case "tree":
                val =
                  val === undefined || val === null || val === "" ? "" : val;
                this.$set(
                  item,
                  "value",
                  val instanceof Array ? val : val.split(",")
                );
                break;

              case "number":
                item.value = typeof val === "number" ? val : Number(val);
                break;

              default:
                this.$set(item, "value", val);
                break;
            }

            item.label = item.title
              ? item.title
              : idx === -1
              ? "无"
              : this.columns[idx].title;
            this.currentForm.push(item);
          }

          // 顶部按钮编辑
          if (type === "page") {
            this.$set(item, "value", item.value ? item.value : undefined);
            item.label = item.title
              ? item.title
              : idx === -1
              ? ""
              : this.columns[idx].title;
            this.currentForm.push(item);
          }
        });

        return false;
      }

      // 没有弹窗调用接口
      let _params = {};
      if (params) {
        Object.keys(params).map(key => {
          _params[key] = record[params[key]];
        });
      }

      // 调用接口前处理参数
      if (beforeRequest) {
        const res = beforeRequest(
          _params,
          index,
          record,
          rowIndex,
          this.currentForm
        );
        _params = res || _params;
      }

      // 调用接口
      !showDailog &&
        api &&
        api(_params).then(res => {
          if (res.success) {
            // 接口调用成功函数
            callback && callback(res);
            this.$message.success(res.message);
            // 刷新页面
            refresh && this.renderTableData();
          }
        });
    },
    // 筛选
    queryChangeHandle(filter) {
      this.filters = filter;
      // 重置页码
      this.paginationConfig.current = 1;
      this.renderTableData();
    },
    // 加载列表
    renderTableData() {
      const {
        dataApi,
        filters,
        dataApiParams,
        paginationConfig,
        pagination,
        dataSource
      } = this;

      this.data = dataSource;

      if (!dataApi) return false;
      const params = {
        query: filters,
        ...dataApiParams
      };

      const { current, pageSize } = paginationConfig;

      if (pagination) {
        params.page = current;
        params.pageSize = pageSize;
      }

      dataApi({ ...params }).then(res => {
        if (res.success || res.status) {
          this.data = res.data;
          this.paginationConfig.total = res.length;
        } else {
          this.data = [];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.form-label {
  margin: 10px;
}

.opt-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  .left {
    // flex: 1;
    margin-right: 10px;
  }
}
.btn-warning {
  background: #e6a23c;
  border: 1px solid #e6a23c;
  color: white;
}
.opt-list .opt-btn {
  margin-right: 10px;
}
.opt-list .opt-btn:last-child {
  margin-right: 0;
}
</style>
