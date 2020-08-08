<template>
    <div class="LargeScreenVsualization">
        <ToolBar :toolList="toolList"></ToolBar>
        <Sketchpad></Sketchpad>
        <PanelLeft :materialList="materialList"></PanelLeft>
        <PanelRight></PanelRight>
    </div>
</template>

<script>
import config from '@/assets/js/index'
import PanelLeft from '@comp/containers/PanelLeft'
import PanelRight from '@comp/containers/PanelRight'
import ToolBar from '@comp/containers/ToolBar'
import Sketchpad from '@comp/containers/Sketchpad'
export default {
    name: 'LargeScreenVsualization',
    data () {
       return {
           // 元素列表
           materialList: config.materials(),
           // 工具列表
           toolList: config.tools(config.system).toolList,
       }
    },
    components: {
        PanelLeft,
        PanelRight,
        ToolBar,
        Sketchpad
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
