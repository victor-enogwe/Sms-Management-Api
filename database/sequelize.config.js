const { isDevMode, isTestMode } = require('../utils')
const dialect = 'postgres'
const url = process.env.DATABASE_URL
const devMode = isDevMode || isTestMode
const config = {
  url,
  dialect,
  logging: devMode ? log => log : false,
  dialectOptions: {
    multipleStatements: true,
    ssl: !devMode
  },
  define: {
    timestamps: true,
    underscored: true,
    version: true
  },
  operatorsAliases: false
}

module.exports = config
