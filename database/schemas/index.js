const queries = require('../queries')

function initializeDb (sequelize, query) {
  return sequelize.query(query)
}

module.exports = {
  initializeDb,
  ...queries
}
