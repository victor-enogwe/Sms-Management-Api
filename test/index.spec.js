const glob = require('glob')
const path = require('path')
const { sandbox, logger } = require('./helpers')

const specFiles = glob.sync('*.spec.js', {
  cwd: path.resolve(__dirname), matchBase: true, ignore: ['helpers/**']
})

before(() => {
  sandbox.spy(logger, 'info')
  sandbox.spy(logger, 'error')
})

after(() => {
  sandbox.restore()
})

specFiles.map(file => require(`./${file}`))
