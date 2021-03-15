module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          "primary-color": "#1F61AD",
          // 'link-color': '#F5222D',
          "border-radius-base": "2px",
          "form-item-height": "50px",
          "pad-button-height": "50px"
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8688,
    open: true,
    hot: true
  }
};
