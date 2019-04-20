import cluster from 'cluster'
import Res from '@res/core'

const workers = []

class Worker {
  static start() {
    const threads = Res.threads
    for (let i = 0; i < threads; i++) {
      workers.push(new Worker())
    }
    cluster.on('exit', (worker, code) => {
      if (code == 0) return
      console.log(`Worker ${worker.process.pid} died`)
      const w = workers.find((w) => w.worker == worker)
      if (w) {
        w.remove()
        new Worker()
      }
    })
  }

  static stop() {
    return Promise.all(workers.map((worker) => worker.stop()))
  }

  static restart() {
    this.stop().then(() => {
      this.start()
    })
  }

  constructor() {
    this.worker = cluster.fork()
    console.log(`Worker ${this.worker.process.pid} started`)
    this.listening = false
    this.worker.on('listening', () => {
      this.listening = true
    })
    this.resolve = this.resolve.bind(this)
  }

  stop() {
    return new Promise((resolve) => {
      this.worker.on('disconnect', this.resolve(resolve))
      this.worker.on('exit', this.resolve(resolve))
      if (this.listening) this.worker.send('shutdown')
      this.worker.disconnect()
      this.timeout = setTimeout(() => {
        this.worker.kill()
      }, 2000)
    })
  }

  resolve(resolve) {
    return () => {
      this.remove()
      resolve()
    }
  }

  remove() {
    if (this.timeout) clearTimeout(this.timeout)
    const index = workers.indexOf(this)
    if (index >= 0) {
      console.log(`Worker ${this.worker.process.pid} removed`)
      workers.splice(index, 1)
    }
  }
}

export default Worker
