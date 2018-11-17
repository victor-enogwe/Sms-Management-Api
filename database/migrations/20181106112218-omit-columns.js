'use strict'

const { getTables } = require('./20181106112217-timestamp-columns')
const { omitColumns } = require('../queries')

module.exports = {
  async up (queryInterface, Sequelize) {
    const tables = await getTables(queryInterface)
    await queryInterface.sequelize.query(omitColumns({ tables }).up)
  }
}
