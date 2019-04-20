import path from 'path'
import glob from 'glob'
import chokidar from 'chokidar'

class Watch {
  constructor(dir) {
    this.watcherChange = this.watcherChange.bind(this)
    this.files = glob.sync(path.resolve(dir, '**.(js|jsx|haml)'), { ignore: 'node_modules/**' })
    this.watcher = chokidar.watch(this.files)
    this.watcher.on('change', this.watcherChange)
  }

  watcherChange(path) {
    delete require.cache[require.resolve(path)]
    if (this.callback) this.callback()
  }

  change(callback) {
    this.callback = callback
  }
}

export default Watch
