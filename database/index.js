const Sequelize = require('sequelize')
const fs = require('fs')
const config = require('../database/sequelize.config')

const db = {}
const sequelize = new Sequelize(config.url, config)

fs
  .readdirSync(`${__dirname}/models`)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(`./models/${file}`)
    db[model.name] = model
  })

Object.keys(db).forEach((key) => {
  const model = db[key]
  if ('associate' in model) model.associate(db)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = { db }
