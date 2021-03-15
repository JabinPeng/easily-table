const Mock = require('mockjs')

require('./tableData')

Mock.setup({
    timeout: 800 // setter delay time
})
console.log('mock success')
