module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          "primary-color": "#40a9ff"
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8688,
    open: true,
    proxy: {
      "/api": {
        target: "127.0.0.1:8688"
      }
    }
  }
};
