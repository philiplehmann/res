import { Model, DataTypes } from 'sequelize'
import sequelize from './config'

class Todo extends Model {}
Todo.init(
  {
    userId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE,
    doneAt: DataTypes.DATE
  },
  { sequelize, modelName: 'Todos' }
)

export default Todo
