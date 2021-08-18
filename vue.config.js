module.exports = {
  lintOnSave: false,
  css: {
    sourceMap: true // 开启 CSS source maps
  },
  configureWebpack: config => {
    config.devtool = 'source-map'
  }
}
