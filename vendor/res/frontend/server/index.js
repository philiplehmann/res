import path from 'path'
import express from 'express'
import Webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import proxy from 'http-proxy-middleware'

import Res from '@res/core'

class Server {
  constructor({ webpackConfig, path }) {
    this.webpackConfig = webpackConfig
    this.path = path
  }

  start() {
    this.app = express()
    this.app.use(express.static(path.resolve(this.path, 'public')))
    const config = require(path.resolve(this.path, 'config', 'webpack')).default
    const compiler = Webpack(config)
    this.app.use(
      devMiddleware(compiler, {
        stats: { colors: true }
      })
    )
    this.app.use(hotMiddleware(compiler))
    this.app.use(
      proxy({
        target: `http://${Res.backend_host}:${Res.backend_port}`,
        xfwd: true,
        ws: true
      })
    )
    this.app.listen(Res.frontend_port)
  }
}

export default Server
