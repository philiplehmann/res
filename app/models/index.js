import User from './user'
import Todo from './todo'

User.hasMany(Todo)
Todo.belongsTo(User)
