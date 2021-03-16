<template>
  <div id="app">
    <EasilyTable
      :data-source="data"
      :data-api-params="{}"
      :columns="columns"
      :row-options="rowOptions"
      :page-options="pageOptions"
      :tags-filter="tagsFilter"
      :pagination="true"
    ></EasilyTable>
  </div>
</template>

<script>
import EasilyTable from "./components/EasilyTable/Index";
import { httpAction } from "./mock/api";
import { getList } from "./mock/api/data";

export default {
  name: "App",
  components: {
    EasilyTable
  },
  data() {
    return {
      // data: getList,
      data: this.loadData,
      tagsFilter: [
        {
          title: "库位名称",
          dataIndex: "warehouse_name",
          key: "warehouse_name"
        },
        { title: "货区编号", dataIndex: "warehouse_Num", key: "warehouse_Num" },
        { title: "库位类型", dataIndex: "warehouseType", key: "warehouseType" },
        { title: "工厂编号", dataIndex: "factoryNum", key: "factoryNum" },
        { title: "库位编号", dataIndex: "placeCode", key: "placeCode" },
        { title: "库位名称", dataIndex: "placeName", key: "placeName" }
      ],
      columns: [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "工厂编号", dataIndex: "factoryNum", key: "factoryNum" },
        {
          title: "货区名称",
          dataIndex: "warehouse_name",
          key: "warehouse_name"
        },
        { title: "货区编号", dataIndex: "warehouse_Num", key: "warehouse_Num" },
        { title: "货区类型", dataIndex: "warehouseType", key: "warehouseType" },
        { title: "库位编号", dataIndex: "placeCode", key: "placeCode" },
        { title: "库位名称", dataIndex: "placeName", key: "placeName" },
        {
          title: "操作",
          width: 200,
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      rowOptions: [
        {
          icon: "edit",
          title: "修改",
          showTitle: true,
          showConfirm: false,
          showDailog: true,
          refresh: true,
          formFields: [
            {
              type: "input",
              key: "warehouse_Num",
              dataIndex: "warehouse_Num",
              disabled: true
            },
            {
              type: "input",
              key: "warehouse_name",
              dataIndex: "warehouse_name"
            },
            {
              type: "select",
              key: "factoryNum",
              dataIndex: "factoryNum",
              options: []
            },
            {
              key: "warehouseType",
              dataIndex: "warehouseType",
              type: "select",
              options: [
                {
                  key: "成品库",
                  value: "成品库"
                },
                {
                  key: "毛坯库",
                  value: "毛坯库"
                }
              ]
            },
            { key: "placeCode", dataIndex: "placeCode" },
            { key: "placeName", dataIndex: "placeName" }
          ],
          type: "primary",
          api: null
        },
        {
          icon: "delete",
          title: "删除",
          showConfirm: true,
          showTitle: true,
          type: "danger",
          refresh: true,
          params: {
            id: "id"
          },
          api: (params) => {
            return httpAction('list/del', 'delete', { id: params.id }).then((res) => {
              return res
            })
          },
        }
      ],
      pageOptions: [
        {
          title: '刷新',
          type: "primary",
          icon: 'undo',
          api: this.loadData
        },
        {
          icon: "plus-circle",
          title: "添加",
          showDailog: true,
          showConfirm: false,
          showTitle: false,
          type: "primary",
          refresh: true,
          // 表单展示数据
          formFields: [
            { key: "warehouse_name", dataIndex: "warehouse_name" },
            { key: "warehouse_Num", dataIndex: "warehouse_Num" },
            {
              key: "factoryNum",
              dataIndex: "factoryNum",
              options: [],
              type: "select"
            },
            {
              key: "warehouseType",
              dataIndex: "warehouseType",
              type: "select",
              options: [
                {
                  key: "成品库",
                  value: "成品库"
                },
                {
                  key: "毛坯库",
                  value: "毛坯库"
                }
              ]
            },
            { key: "placeCode", dataIndex: "placeCode" },
            { key: "placeName", dataIndex: "placeName" }
          ],
          api: null
        }
      ]
    };
  },
  methods: {
    /** 获取列表 **/
    loadData (params) {
      return getList(params).then((res) => {
          return res
      })
    }
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
  padding: 20px;
}
</style>
