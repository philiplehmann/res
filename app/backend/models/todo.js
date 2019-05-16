import Model from '@res/model'

class Todo extends Model {
  static fields = {
    id: { type: 'uuid', primaryKey: true },
    fistName: { type: 'string' },
    lastName: { type: 'string' },
    userId: { type: 'uuid', primaryKey: true },
    timestamps: true
  }

  static relations = {
    user: belongsTo()
  }
}

export default Todo
