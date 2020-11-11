const path = require('path')
const axios = require('axios')
const bodyParser = require('body-parser')
const qs = require('qs')
const setCookieParser = require('set-cookie-parser')
const chalk = require('chalk')

module.exports = {
  publicPath: process.env.VUE_APP_BASE_API,
  devServer: {
    before: function (app, server, compiler) {
      const domainName = '192.168.1.101'
      const backEndPort = '8080'

      app.use(bodyParser.urlencoded({ extended: false }))

      app.all(/^\/api\/dbcourse\/.*/, (req, res) => {

        console.log(chalk.blue(`${req.method} to: http://${domainName}:${backEndPort}${req.url}`))

        if (req.method === 'OPTIONS') {
          res.sendStatus(200);
        } else if (req.method === 'GET') {
          axios.get(`http://${domainName}:${backEndPort}${req.url}`, {
            headers: req.headers
          })
            .then((tempRes) => {
              const data = tempRes.data
              console.log(chalk.green(`The data is: ${JSON.stringify(data)}`))
              res.header('content-type', tempRes.headers['content-type'])
              const cookies = setCookieParser.parse(tempRes.headers['set-cookie'])
              for (const cookie of cookies) {
                const keys = Reflect.ownKeys(cookie)
                const options = {}
                for (const key of keys) {
                  options[key] = cookie[key]
                }
                res.cookie(cookie.name, cookie.value, options)
              }
              res.send(data)
            })
            .catch(e => {
              console.log(chalk.red('get 出错！'))
              const data = e.response.data
              console.log(chalk.red(JSON.stringify(data)))
              res.send(data)
            })
        } else if (req.method === 'POST') {
          console.log(req.body)
          axios.request({
            url: `http://${domainName}:${backEndPort}${req.url}`,
            method: 'post',
            headers: req.headers,
            data: qs.stringify(req.body)
          })
            .then(tempRes => {
              const data = tempRes.data
              console.log(chalk.green(`The data is: ${JSON.stringify(data)}`))
              res.header('Content-Type', tempRes.headers['content-type'])
              const cookies = setCookieParser.parse(tempRes.headers['set-cookie'])
              for (const cookie of cookies) {
                const keys = Reflect.ownKeys(cookie)
                const options = {}
                for (const key of keys) {
                  options[key] = cookie[key]
                }
                res.cookie(cookie.name, cookie.value, options)
              }
              res.send(data)
            })
            .catch(e => {
              console.log(chalk.red('post 出错！'))
              const data = e.response.data
              console.log(chalk.red(JSON.stringify(data)))
              res.send(data)
            })
        } else if (req.method === 'DELETE') {
          console.log()
          axios.delete(`http://${domainName}:${backEndPort}${req.url}`, {
            headers: req.headers
          })
            .then((tempRes) => {
              const data = tempRes.data
              res.header('content-type', tempRes.headers['content-type'])
              console.log(chalk.green(`The data is: ${JSON.stringify(data)}`))
              res.send(data)
            })
            .catch(e => {
              console.log(chalk.red('delete 出错！'))
              const data = e.response.data
              console.log(chalk.red(JSON.stringify(data)))
              res.send(data)
            })
        }
      })
    }
  },
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
