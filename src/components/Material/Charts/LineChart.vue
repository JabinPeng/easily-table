<template>
    <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
    import echarts from "echarts";
    import resize from "./mixin/eResize";
    export default {
        name: "lineChart",
        mixin: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100%'
            },
            pieData: {
                type: Array,
                default: () => {
                    return [{
                        name: 'A级',
                        value: 50.37
                    }, {
                        name: 'L级',
                        value: 30.37
                    }, {
                        name: 'C级',
                        value: 20.37
                    }, {
                        name: 'B级',
                        value: 70.37
                    }]
                }
            }
        },
        watch: {
            pieData: function (val) {
                // this.chartData = val
                this.initChart()
            }
        },
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            this.initChart()
        },
        beforeDestroy () {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart () {
                var colorList = ['#F9D704', '#2774E4', '#887CF4', '#12DD9B']
                this.chart = echarts.init(document.getElementById(this.id))

                this.chart.setOption({
                    title: {
                        // text: '污染物占比',
                        // x: 'center',
                        // y: 'center',
                        // textStyle: {
                        //     fontSize: 25
                        // }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [{
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['40%', '80%'],
                        clockwise: false,
                        avoidLabelOverlap: true,
                        hoverOffset: 15,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        label: {
                            show: true,
                            position: 'outside',
                            formatter: '{a|{b}项目：{c}个}\n{hr|}',
                            rich: {
                                hr: {
                                    backgroundColor: 't',
                                    borderRadius: 3,
                                    width: 3,
                                    height: 3,
                                    padding: [3, 3, 0, -12]
                                },
                                a: {
                                    padding: [-30, 15, -20, 15]
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 20,
                                length2: 20,
                                lineStyle: {
                                    width: 1
                                }
                            }
                        },
                        data: this.pieData
                    },
                        {
                            name: '内边框',
                            type: 'pie',
                            clockWise: false, // 顺时加载
                            hoverAnimation: false, // 鼠标移入变大
                            center: ['50%', '50%'],
                            radius: ['48%', '48%'],
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 9,
                                name: '',
                                itemStyle: {
                                    normal: {
                                        lineStyle: {
                                            type: 'dotted' // 'dotted'虚线 'solid'实线
                                        },
                                        borderWidth: 0,

                                        borderColor: '#ccc'
                                    }
                                }
                            }]
                        }]
                })
            }
        }
    }
</script>

<style scoped>

</style>
