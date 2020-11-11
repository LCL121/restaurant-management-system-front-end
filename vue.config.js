const path = require('path')

module.exports = {
  publicPath: process.env.VUE_APP_BASE_API,
  // devServer: {
  //   proxy: {
  //     '^/api/dbcourse': {
  //       target: '',
  //     }
  //   }
  // },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '餐厅系统'
        return args
      })

    if (process.env.NODE_ENV === 'development') {
      config.module
        .rule('eslint')
        .use('eslint-loader')
        .loader('eslint-loader')
        .tap(options => {
          options.fix = true
          return options
        })
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: path.join(__dirname, 'src/assets'),
        utils: path.join(__dirname, 'src/utils')
      }
    }
  }
}
