import { Model, DataTypes } from 'sequelize'
import sequelize from './config'

class User extends Model {}
User.init(
  {
    gender: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
  { sequelize, modelName: 'Users' }
)

export default User
