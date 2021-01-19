const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    css: {
        loaderOptions: {
            less: {
                modifyVars: {}
            }
        }
    },
    configureWebpack: config => {
        // 生产环境取消 console.log
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@comp', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@utils', resolve('src/utils'))
    },
    devServer: {
        port: 9099,
        open: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://10.0.15.23:80', // 预生产
        //         changeOrigin: true
        //     }
        // }
    },
    productionSourceMap: false,
    lintOnSave: false
}
