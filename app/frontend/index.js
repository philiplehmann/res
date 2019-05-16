/* global ATP_ENV */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ws from '../../config/ws'

console.log(ws[ATP_ENV.ENV])

const socket = new WebSocket(ws[ATP_ENV.ENV])

socket.addEventListener('open', (event) => {
  console.log('open', event)
  socket.send('hallo')
})
socket.addEventListener('close', (event) => {
  console.log('close', event)
})
socket.addEventListener('error', (event) => {
  console.log('error', event)
})
socket.addEventListener('message', (event) => {
  console.log('test', event)
})

import Root from 'views/root'

const jsx = (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
)

const app = document.getElementById('app')
ReactDOM.hydrate(jsx, app)
