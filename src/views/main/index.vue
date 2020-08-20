<template>
    <div class="LargeScreenVsualization">
        <ToolBar :toolList="toolList"></ToolBar>
        <Sketchpad></Sketchpad>
        <PanelLeft :materialList="materialList"></PanelLeft>
        <PanelRight></PanelRight>
    </div>
</template>

<script>
import tools from '@/core/tools'
import PanelLeft from '@comp/containers/PanelLeft'
import PanelRight from '@comp/containers/PanelRight'
import ToolBar from '@comp/containers/ToolBar'
import Sketchpad from '@comp/containers/Sketchpad'

export default {
    name: 'LargeScreenVsualization',
    data () {
       return {
           // 元素列表
           materialList: [],
           // 工具列表
           toolList: [],
       }
    },
    components: {
        PanelLeft,
        PanelRight,
        ToolBar,
        Sketchpad
    },
    created () {
       this.$nextTick(this.init)
       this.$bus.$on('editor/add/node', _t.doAddNode)
    },
    methods: {
        init () {
           this.toolList = tools(this.$store.state.system).toolList
           this.materialList = this.$store.state.material.defMaterials  
        }
    }
}
</script>

<style lang="less" scoped>
    .LargeScreenVsualization{
        display: inline-block;
        width: 100%;
        height: 100%;
        user-select: none;
        overflow: hidden;
        background: #f8f9fa;
        color:red;
    }
</style>
