const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import '~@/assets/styles/variables.scss'; @import '~@/assets/styles/fonts.scss'; @import '~@/assets/styles/base.scss';`
      }
    }
  },
  publicPath: 'https://megfree.github.io/vue3-d3-russia-map/',
})
