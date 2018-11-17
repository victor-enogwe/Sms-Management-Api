'use strict'

const { omitTables } = require('../queries')
const tables = ['SequelizeMeta']

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(omitTables({ tables }).up)
}
