class ModelProxy {
  constructor({ adapter, model }) {
    this.adapter = adapter
    this.model = model
    this._where = null
    this._limit = null
    this._order = null
    this._include = null
    this._select = null
  }

  where(where) {
    this._where = { ...(this._where || {}), ...where }
    return this
  }

  limit(...args) {
    let from, count
    if (args.length == 2) {
      ;[from, count] = args
      this._limit = { from, count }
    } else if (args.length == 1) {
      ;[count] = args
      this._limit = { ...(this._limit || {}), count }
    }
    return this
  }

  order(fields, order) {
    this._order = { fields, order }
    return this
  }

  all() {
    return this.adapter.select({
      where: this._where,
      limit: this._limit,
      order: this._order,
      include: this._include,
      select: this._select
    })
  }

  first() {
    return this.limit(1)
      .this.all()
      .then(selectOne)
  }

  last() {
    return this.limit(1)
      .this.all()
      .then(selectOne)
  }
}

export default ModelProxy
