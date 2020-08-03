/**
* PanelRight 右侧面板
*/

<style scoped lang="less" rel="stylesheet/less"></style>

<template>
  <CardBox
    placement="right"
    position="left"
    :width="360"
    @expand="toggleHandler"
  >
  </CardBox>
</template>

<script>
  import CardBox from '@comp/containers/CardBox'


  export default {
    name: 'PanelRight',
    components: {
      CardBox
    },
    props: {
      editorConfig: Object,
      toolList: Array,
      currentItem: Array
    },
    computed: {
    },
    methods: {
      toggleHandler (data) {
        const _t = this
        _t.$bus.$emit('editor/panel/toggle', data)
      }
    }
  }
</script>
