import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Root from 'views/root'

const jsx = (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
)

const app = document.getElementById('app')
ReactDOM.hydrate(jsx, app)
