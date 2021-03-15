<template>
  <div class="table-filter">
    <div
      class="filter-triger"
      @click="filterHandle"
    >
      <span> 筛选条件：{{ activeFilterNum }}个，共{{ tagsFilter.length }}个</span>
      <span
        style="margin-left:10px;"
        class="filter-btn"
      >
        <a-icon
          type="filter"
          style="margin-right:0.5rem;font-size:1rem;"
        />
        <span>添加筛选</span>
      </span>
    </div>

    <div
      class="filter-content"
      v-show="showFilter"
    >
      <ul class="filters-list">
        <li
          v-for="(item, index) in tagsFilter"
          :key="index"
          class="filter-item"
        >
          <span
            class="title"
            :title="item.title"
          >{{ item.title }}：</span>
          <a-input
            style="width:150px;"
            v-model="tagsFilter[index].value"
          />
        </li>
      </ul>
      <div class="opt-area">
        <a-button
          type="default"
          icon="close-circle"
          @click="clearHandle"
        >
          清空
        </a-button>
        <a-button
          type="default"
          style="margin-left:10px;"
          icon="redo"
          @click="cancelHandle"
        >
          取消
        </a-button>
        <a-button
          type="primary"
          style="margin-left:10px;"
          icon="check-circle"
          @click="confirmHandle"
        >
          确定
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import clonedeep from 'lodash.clonedeep'
export default {
  props: {
    filters: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeFilterNum: 0,
      showFilter: false,
      originFilter: [],
      tagsFilter: this.filters,
      queryFilters: []
    }
  },
  methods: {
    // 取消
    cancelHandle () {
      this.showFilter = false
      // 恢复初始值
      this.tagsFilter = clonedeep(this.originFilter)
    },
    // 清空
    clearHandle () {
      this.tagsFilter.map(item => {
        item.value = ''
      })
    },
    // 确定
    confirmHandle () {
      this.showFilter = false

      // 过滤有值的
      this.queryFilters = []
      this.activeFilterNum = 0
      this.tagsFilter.map(item => {
        if (item.value !== '' && item.value !== undefined) {
          this.activeFilterNum++
          this.queryFilters.push({
            fieldName: item.dataIndex,
            value: item.value
          })
        }
      })

      // 更新初始值
      this.originFilter = clonedeep(this.tagsFilter)

      this.$emit('change', this.queryFilters)
    },
    handleChange () {},
    filterHandle () {
      this.showFilter = true
    }
  },
  beforeMount () {
    const { tagsFilter } = this
    this.tagsFilter = tagsFilter
      ? tagsFilter.map(item => {
          return { ...item, value: '' }
        })
      : []

    // 保存初始值
    this.originFilter = clonedeep(tagsFilter)
  },
  computed: {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.table-filter {
  display: inline-block;
  position: relative;
  .filter-triger {
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    width: 320px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid @primary-color;
    padding: 0px 0px 0px 0.5rem;
    border-radius: 2px;
    cursor: pointer;
    .filter-btn {
      padding: 0 15px;
      border: 1px solid @primary-color;
      height: 2.25rem;
      line-height: 2.25rem;
      background: @primary-color;
      color: white;
      font-size: 0.8rem;
    }
  }

  .filter-content {
    max-height: 250px;
    width: 320px;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 100000;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
  }

  ul.filters-list {
    flex: 1;
    overflow: auto;
    padding: 0;
    margin: 0;
    padding: 10px 15px;
    li.filter-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0;
      .title {
        width: 180px;
        margin-right: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .opt-area {
    text-align: center;
    padding: 10px 10px;
    .anticon {
      font-size: 1rem;
    }
  }
}
</style>
