<style scoped lang="less" rel="stylesheet/less">
  .tool-bar {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
    background: #ffffff;
    z-index: 500;
    transition: all .5s ease-in-out;

    .tool-box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-content: flex-start;
      flex: 1 1 auto;
      z-index: 10;

      &.left {
        justify-content: flex-start;
      }
      &.center {
        justify-content: flex-start;
      }
      &.right {
        justify-content: flex-end;
      }
      .tool-item {
        display: inline-block;

        .link {
          display: inline-block;
          line-height: 1;
          vertical-align: middle;

          .icon {
            width: 40px;
            height: auto;
          }
        }
      }
      .divider {
        height: calc(~"100% - 10px");
      }
    }
  }
</style>

<template>
  <div class="tool-bar" :style="toolBarStyle">
    <Handler
      class="handler"
      mode="horizontal"
      position="bottom"
      :expand="isExpand"
      :callback="toggleHandler"
    >
    </Handler>
    <template v-for="(type, typeIndex) in Object.keys(toolMap)">
      <ToolBox mode="horizontal" :key="typeIndex" :class="type">
        <template v-for="(item, index) in toolMap[type]">
         <ToolItem
            v-if="item.type === 'link'"
            :key="'tool_' + type + '_item_' + index"
            :title="handleLabel(item)"
            :active="item.active"
            :disabled="item.disabled"
            :style="item.toolbar.style"
            @click.native="handleToolClick(item)"
          >
            <template v-slot:label>
              <a class="link" :href="item.link" target="_blank" style="color: #333333;">
                <img :src="item.img" :label="handleLabel(item)" style="width:40px;height:40px;" />
              </a>
            </template>
          </ToolItem>
        </template>
      </ToolBox>
    </template>
  </div>
</template>

<script>
  import Handler from '@comp/Handler'
  import ToolBox from '@comp/ToolBox/Index'
  import ToolItem from '@comp/ToolBox/ToolItem'

  export default {
    name: 'ToolBar',
    components: {
      Handler,
      ToolBox,
      ToolItem
    },
    props: {
      editorData: Object,
      toolList: Array,
      currentItem: Array
    },
    data () {
      return {
        formData: this.editorData ? { ...this.editorData } : {},
        // 是否展开
        isExpand: true
      }
    },
    computed: {
      toolBarStyle () {
        const _t = this
        const style = {}
        // 处理展开
        if (_t.isExpand) {
          style.top = 0
        } else {
          style.top = '-40px'
        }
        return style
      },
      toolMap () {
        const _t = this
        const toolMap = {}
        _t.toolList.forEach(item => {
          if (item.enableTool && item.enable && item.toolbar && item.toolbar.enable) {
            const position = item.toolbar.position
            if (!toolMap.hasOwnProperty(position)) {
              toolMap[position] = []
            }
            toolMap[position].push(item)
          }
        })
        return toolMap
      }
    },
    methods: {
      toggleHandler (val) {
        const _t = this
        _t.isExpand = val !== undefined ? val : !_t.isExpand
      },
      handleDropdownClick (item, type, index, val) {
        const _t = this
        // console.log('handleDropdownClick', item.name)
        if (item.disabled) {
          return
        }
        const child = item.children[val]
        _t.formData[item.name] = child.name
        const payload = {
          context: 'ToolBar',
          type: item.type,
          name: item.name,
          data: child.data,
          selected: val
        }
        _t.$bus.$emit('editor/tool/trigger', payload)
      },
      handleToolClick (item, val) {
        const _t = this
        // console.log('handleToolClick', item.name, val)
        if (item.disabled) {
          return
        }
        let payload = {
          context: 'ToolBar',
          name: item.name
        }
        switch (item.name) {
          case 'fill':
          case 'lineColor':
            _t.formData[item.name] = val
            payload = {
              ...payload,
              data: val
            }
            break
          case 'toFront':
          case 'toBack':
            payload = {
              ...payload,
              data: _t.currentItem
            }
            break
        }
        _t.$bus.$emit('editor/tool/trigger', payload)
      },
      // 处理label
      handleLabel (item) {
        let label = item.lang
        if (item.shortcuts) {
          label += ` (${item.shortcuts.label})`
        }
        return label
      }
    },
    created () {
      const _t = this
      _t.$bus.$on('editor/pad/dblclick', _t.toggleHandler)
    }
  }
</script>
