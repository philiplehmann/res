import React from 'react'
import { StaticRouter } from 'react-router-dom'

const Router = (req, Layout) => {
  return (
    <StaticRouter location={req.url} context={{}}>
      <Layout />
    </StaticRouter>
  )
}

export default Router
