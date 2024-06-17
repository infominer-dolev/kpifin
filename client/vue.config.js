const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../server/wwwroot",
  configureWebpack: {
    devtool: 'source-map'
  }, 
  publicPath: process.env.VUE_APP_BASE_URL

})
