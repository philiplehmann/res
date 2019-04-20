require('@babel/register')
import path from 'path'
import fs from 'fs'
import http from 'http'
import express from 'express'
import socketIO from 'socket.io'
import haml from 'hamljs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import Res from '@res/core'
import Worker from './worker'
import Watch from './watch'

class Server {
  static start(dir) {
    const watcher = new Watch(dir)
    watcher.change(() => Worker.restart())
    Worker.start()
  }

  constructor({ routes, path }) {
    this.routes = routes
    this.path = path
  }

  start() {
    this.app = express()
    this.server = http.Server(this.app)
    this.io = socketIO(this.server)
    this.routes({ app: this.app, io: this.io })
    this.app.get('/*', (req, res) => {
      const Layout = require(path.resolve(this.path, 'app/frontend/layouts/default.jsx')).default
      const jsx = createElement(Layout, { location: req.url, context: {} })
      const hamlView = fs.readFileSync(path.resolve(this.path, 'app/frontend/layouts/default.haml'), 'utf8')
      res.send(haml.render(hamlView, { locals: { app: renderToString(jsx) } }))
    })
    this.server.listen(Res.backend_port)
  }
}

export default Server

// io.on('connection', (socket) => {
//   socket.emit('news', { hello: 'world' })
//   socket.on('my other event', function (data) {
//     console.log(data)
//   })
// })
