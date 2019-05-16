import path from 'path'
import Sequelize from 'sequelize'
import Res from '@res/core'

const config = require(path.resolve('config/database.json'))[Res.environment]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

export default sequelize
