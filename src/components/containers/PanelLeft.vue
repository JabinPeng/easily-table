
<style scoped lang="less" rel="stylesheet/less">
  .panel-left {
    .card-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
  }
</style>

<template>
  <CardBox class="panel-left" placement="left" position="right" :width="250"  @expand="toggleHandler">
    <CardItem
      v-for="(item, index) in materials"
      :key="index"
      :enableFold="true"
      :bold="true"
    >
      <NodeElement
        v-for="(child, childIndex) in item.children.filter(target => target.enable)"
        :key="childIndex"
        :title="child.label"
        :info="child"
      >
      </NodeElement>
    </CardItem>
  </CardBox>
</template>

<script>
  import CardBox from '@comp/containers/CardBox'
  import CardItem from '@comp/containers/CardItem'
  import NodeElement from '@comp/containers/NodeElement'

  export default {
    name: 'PanelLeft',
    components: {
      CardBox,
      CardItem,
      NodeElement
    },
    props: {
      materialList: Array
    },
    data () {
      return {}
    },
    computed: {
      materials () {
        return this.materialList.filter(item => item.enable)
      }
    },
    methods: {
      toggleHandler (data) {
        const _t = this
        _t.$bus.$emit('editor/panel/toggle', data)
      }
    }
  }
</script>
