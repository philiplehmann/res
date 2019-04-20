import debug from 'debug'
import cluster from 'cluster'
import Res from '@res/core'
import FrontendServer from '@res/frontend-server'
import BackendServer from '@res/backend-server'
import routes from './config/routes'
import webpack from './config/webpack'


if (cluster.isMaster) {
  BackendServer.start(__dirname)
  const frontend = new FrontendServer({ webpack, path: __dirname })
  frontend.start()
} else if (cluster.isWorker) {
  const backend = new BackendServer({ routes, path: __dirname })
  backend.start()
}
