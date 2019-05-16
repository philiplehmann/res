require('@babel/register')
import path from 'path'
import fs from 'fs'
import express from 'express'
import expressWS from 'express-ws'
import haml from 'hamljs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import Res from '@res/core'
import Worker from './worker'
import Watch from './watch'

class Server {
  static start(dir) {
    if (!Res.production) {
      const watcher = new Watch(dir)
      watcher.change(() => Worker.restart())
    }
    Worker.start()
  }

  constructor({ routes, path }) {
    this.routes = routes
    this.path = path
  }

  start() {
    this.app = express()
    this.app.use(express.static(path.resolve(this.path, 'public')))
    this.ws = expressWS(this.app)
    this.routes({ app: this.app })
    this.app.ws('/api', (ws, _req) => {
      ws.send('hallo')
      ws.on('message', (msg) => {
        console.log(msg)
      })
    })
    this.app.get('/*', (req, res) => {
      const Layout = require(path.resolve(this.path, 'app/frontend/layouts/default.jsx')).default
      const jsx = createElement(Layout, { location: req.url, context: {} })
      const hamlView = fs.readFileSync(path.resolve(this.path, 'app/frontend/layouts/default.haml'), 'utf8')
      res.send(haml.render(hamlView, { locals: { app: renderToString(jsx) } }))
    })
    this.app.listen(Res.backend_port)
  }
}

export default Server
