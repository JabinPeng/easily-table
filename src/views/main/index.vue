<template>
    <div class="LargeScreenVsualization">
        <PanelLeft :materialList="materialList"></PanelLeft>
    </div>
</template>

<script>
import PanelLeft from '@comp/containers/PanelLeft'
import config from '@/assets/js/index'
export default {
    name: 'LargeScreenVsualization',
    data () {
       return {
           // 元素列表
           materialList: config.materials(),
       }
    },
    components: {
        PanelLeft
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
