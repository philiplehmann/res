class Model {
  static find(id) {
    return this.adapter.find(id)
  }

  static where(...args) {
    return new ModelProxy({ adapter: this.adapter, model: this }).where(...args)
  }

  static order(...args) {
    return new ModelProxy({ adapter: this.adapter, model: this }).order(...args)
  }

  static select(...args) {
    return new ModelProxy({ adapter: this.adapter, model: this }).select(...args)
  }

  static include(...args) {
    return new ModelProxy({ adapter: this.adapter, model: this }).include(...args)
  }

  static create(params) {
    return this.new(params).save()
  }

  static new(params) {
    return new this(params)
  }

  static get adapter() {
    return this._adapter
  }

  static set adapter(adapter) {
    this._adapter = adapter
  }
}

export default Model
