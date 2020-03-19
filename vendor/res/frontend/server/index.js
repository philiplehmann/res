import path from 'path'
import express from 'express'
import Webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import { createProxyMiddleware } from 'http-proxy-middleware'

import Res from '@res/core'

class Server {
  constructor({ path }) {
    this.path = path
  }

  start() {
    this.app = express()
    const config = require(path.resolve(this.path, 'config', 'webpack')).default
    const compiler = Webpack(config)
    this.app.use(
      devMiddleware(compiler, {
        stats: { colors: true }
      })
    )
    this.app.use(hotMiddleware(compiler))
    this.app.use(
      createProxyMiddleware({
        target: `http://${Res.backend_host}:${Res.backend_port}`,
        xfwd: true,
        ws: true
      })
    )
    this.app.listen(Res.frontend_port)
  }

  build() {
    const config = require(path.resolve(this.path, 'config', 'webpack')).default
    const compiler = Webpack(config)
    compiler.run((...args) => console.log(args))
  }
}

export default Server
