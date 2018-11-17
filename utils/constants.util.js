const { NODE_ENV = 'development' } = process.env
const isDevMode = NODE_ENV === 'development'
const isTestMode = NODE_ENV === 'test'

if (isDevMode || isTestMode) require('dotenv').load()

const { DATABASE_URL, JWT_SECRET } = process.env

module.exports = {
  NODE_ENV, isDevMode, isTestMode, DATABASE_URL, JWT_SECRET
}
