// import debug from 'debug'
import cluster from 'cluster'
import Res from '@res/core'
import FrontendServer from '@res/frontend-server'
import BackendServer from '@res/backend-server'
import routes from './config/routes'

if (cluster.isMaster) {
  const frontend = new FrontendServer({ path: __dirname })
  BackendServer.start(__dirname)
  if (Res.production) {
    frontend.build()
  } else {
    frontend.start()
  }
} else if (cluster.isWorker) {
  const backend = new BackendServer({ routes, path: __dirname })
  backend.start()
}
