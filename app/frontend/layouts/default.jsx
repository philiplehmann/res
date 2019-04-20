import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'
import Root from '../views/root'

class Layout extends Component {
  render() {
    return (
      <StaticRouter {...this.props}>
        <Root />
      </StaticRouter>
    )
  }
}

export default Layout
