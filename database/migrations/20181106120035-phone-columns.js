'use strict'

const fields = ['public.Contacts']

module.exports = {
  up: (queryInterface, Sequelize) => Promise
    .all(fields.map(table => queryInterface.addConstraint(
      table,
      ['phone'],
      {
        type: 'check',
        where: {
          phone: Sequelize.literal(`phone ~ '^0\\d{10}$'`)
        }
      }
    ))),

  down: async (queryInterface, Sequelize) => Promise
    .all(fields.map(
      table => queryInterface.removeConstraint(table, `${table}_phone_ck`)
    ))
}
