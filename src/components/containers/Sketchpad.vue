/**
* Sketchpad 画板
*/

<style scoped lang="less" rel="stylesheet/less">
  .sketchpad-box {
    overflow: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .sketchpad {
      display: inline-block;
      width: 1200px;
      height: 1200px;
      position: absolute;
      left: 50%;
      margin-left: -600px;
      margin-top: 100px;
      margin-bottom: 100px;
      z-index: 100;
      background: #ffffff;
      /*background-image: linear-gradient(#f4f4f4 1px,transparent 0),*/
      /*linear-gradient(90deg, #f4f4f4 1px,transparent 0),*/
      /*linear-gradient(hsla(0,0%,100%,.5) 1px,transparent 0),*/
      /*linear-gradient(90deg,hsla(0,0%,100%,.5) 1px,transparent 0);*/
      /*background-size:20px 20px,20px 20px,20px 20px,20px 20px;*/
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
      /** 网格 **/
      .drag-grid {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(90deg, #f4f4f4 10%, rgba(0, 0, 0, 0) 10%),
        linear-gradient(#f4f4f4 10%, rgba(0, 0, 0, 0) 10%);
        background-size: 10px 10px;
      }
      .drag-large-grid {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(90deg, #f4f4f4 1%, rgba(0, 0, 0, 0) 1%),
        linear-gradient(#f4f4f4 1%, rgba(0, 0, 0, 0) 1%);
        background-size: 100px 100px;
      }
    }
    .inputBox {
      display: none;
    }
  }
  .test1 {
    background-color: rgb(239, 154, 154);
  }
  .test2{
    background-color: rgb(129, 212, 250);
  }
  .test3{
    background-color: rgb(174, 213, 129);
  }
</style>

<template>
  <div class="sketchpad-box" :style="boxStyle" @dblclick="ondblclickPad">
    <div class="sketchpad" id="sketchpad" @dblclick.stop @mousedown="setShowGrid">
      <div class="drag-grid" v-show="showGrid"></div>
      <div class="drag-large-grid" v-show="showGrid"></div>
       <vdr
        :w="200"
        :h="200"
        :parent="true"
        :debug="false"
        :min-width="200"
        :min-height="200"
        :isConflictCheck="true"
        :snap="true"
        :grid="[10,10]"
        @refLineParams="getRefLineParams"
        class="test1">
      </vdr>
      <vdr
        :w="200"
        :h="200"
        :parent="true"
        :x="200"
        :debug="false"
        :min-width="200"
        :min-height="200"
        :isConflictCheck="true"
        :snap="true"
        :grid="[10,10]"
        @refLineParams="getRefLineParams"
        class="test2">
      </vdr>

      <vdr
        :w="200"
        :h="200"
        :parent="true"
        :x="420"
        :debug="false"
        :min-width="200"
        :min-height="200"
        :isConflictCheck="true"
        :snap="true"
        :grid="[10,10]"
        @refLineParams="getRefLineParams"
        class="test3">
      </vdr>

       <!--辅助线-->
      <span class="ref-line v-line"
            v-for="item in vLine"
            :key="item.id"
            v-show="item.display"
            :style="{ left: item.position, top: item.origin, height: item.lineLength}"
      />
      <span class="ref-line h-line"
            v-for="item in hLine"
            :key="item.id"
            v-show="item.display"
            :style="{ top: item.position, left: item.origin, width: item.lineLength}"
      />

      <!-- 文本输入框 -->
      <input class="inputBox" autofocus value="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sketchpad',
    data () {
      return {
        // 面板样式
        panelStyle: {
          left: null,
          right: null
        },
        vLine: [],
        hLine: [],
        showGrid: false
      }
    },
    computed: {
      boxStyle () {
        const _t = this
        const boxStyle = {}
        const keys = Object.keys(_t.panelStyle)
        keys.forEach(key => {
          const panelStyle = _t.panelStyle[key]
          if (panelStyle) {
            // 位置数据
            const positionVal = isNaN(parseInt(panelStyle[key])) ? 0 : parseInt(panelStyle[key])
            const width = isNaN(parseInt(panelStyle.width)) ? 0 : parseInt(panelStyle.width)
            boxStyle[key] = positionVal + width + 'px'
          }
        })
        return boxStyle
      }
    },
    methods: {
      /** 网格 */
      setShowGrid () {
        this.showGrid = !this.showGrid
      },
      ondblclickPad () {
        console.log(this)
        const _t = this
        _t.$bus.$emit('editor/pad/dblclick')
      },
       // 辅助线回调事件
    getRefLineParams (params) {
      const { vLine, hLine } = params
      let id = 0
      this.vLine = vLine.map(item => {
        item['id'] = ++id
        return item
      })
      this.hLine = hLine.map(item => {
        item['id'] = ++id
        return item
      })
    }
    },
    created () {
      const _t = this
      _t.$bus.$on('editor/panel/toggle', function (data) {
        _t.$set(_t.panelStyle, data.name, data.style)
      })
    }
  }
</script>
