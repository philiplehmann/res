require('dotenv').config()
import sha512 from 'js-sha512'

class Res {
  get environment() {
    return process.env.RES_ENV || 'development'
  }

  get production() {
    return this.environment == 'production'
  }

  get development() {
    return this.environment == 'development'
  }

  get threads() {
    return Number(process.env.RES_THREAD) || require('os').cpus().length / 2
  }

  get backend_host() {
    return process.env.RES_BACKEND_HOST || 'localhost'
  }

  get backend_port() {
    return Number(process.env.RES_BACKEND_PORT) || 5000
  }

  get frontend_host() {
    return process.env.RES_FRONTEND_HOST || 'localhost'
  }

  get frontend_port() {
    return Number(process.env.RES_FRONTEND_PORT) || 5200
  }

  get hmac() {
    if (process.env.RES_HMAC) return process.env.RES_HMAC
    throw 'RES_HMAC not set'
  }

  sha512(string) {
    return sha512.hmac(this.hmac, string)
  }
}

export default new Res()
