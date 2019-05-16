import Model from '@res/model'

class User extends Model {
  static fields = {
    id: { type: 'uuid', primaryKey: true },
    fistName: { type: 'string' },
    lastName: { type: 'string' },
    timestamps: true
  }

  static relations = {
    todo: hasMany()
  }
}

export default User
