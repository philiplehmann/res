import Res from '@res/core'

export default {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Philip',
          lastName: 'Lehmann',
          email: 'philiplehmann@gmail.com',
          password: Res.sha512('123456'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}

/*
  seed = require('./db/seeders/20190422162829-first-user').default
  sequelize = require('./app/backend/models/config.js').default
  seed.up(sequelize.getQueryInterface())
 */
