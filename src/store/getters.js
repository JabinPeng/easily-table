import Vue from 'vue'

const getters = {
    canvasList: state => state.canvas.canvasList,
    // test 取第一个
    elements: state => state.canvas.canvasList[0].elements
}

export default getters
