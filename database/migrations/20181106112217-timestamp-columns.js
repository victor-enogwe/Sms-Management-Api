'use strict'

const { getTableNames, createUpdateTimestampTrigger } = require('../schemas')
const { flattenArray } = require('../../utils')
const getTables = queryInterface => queryInterface.sequelize.query(
  getTableNames(['public']),
  { type: queryInterface.sequelize.QueryTypes.SELECT }
).map(table => table.name.replace('public.', ''))
  .filter(table => table !== 'SequelizeMeta')
const setTrigger = ({ queryInterface, tables, addTrigger }) => Promise.all(
  flattenArray(tables).map(item => {
    const { up, down } = createUpdateTimestampTrigger(item)
    return queryInterface.sequelize.query(addTrigger ? up : down)
  })
)

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createFunction(
      'create_update_timestamp',
      [],
      'TRIGGER',
      'plpgsql',
      `
        BEGIN
          IF (TG_OP = 'UPDATE') THEN
            NEW.updated_at := now();
            RETURN NEW;
          END IF;
        END;
      `,
      [
        'VOLATILE'
      ]
    )

    const tables = await getTables(queryInterface)

    await setTrigger({ queryInterface, tables, addTrigger: true })
  },

  async down (queryInterface, Sequelize) {
    const tables = await getTables(queryInterface)
    await setTrigger({ queryInterface, tables, addTrigger: false })
  },

  getTables
}
