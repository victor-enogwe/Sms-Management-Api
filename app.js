const { isDevMode, isTestMode } = require('./utils')

const express = require('express')
const helmet = require('helmet')
const http = require('http')
const { logger } = require('./logs')
const { postGraphqlMiddleware } = require('./middlewares')

const app = express()
const server = http.createServer(app)
const PORT = isDevMode ? 3000 : (process.env.PORT || 3000)

/**
* Event listener for HTTP server "listening" event.
 *
 * @param {Object} server the http server instance
 *
 * @returns {null} server process is continous here, so no returns
 */
function onListening (server) {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`

  logger.info(`🚧 App is Listening on ${bind}`)
}

/**
 * Event listener for HTTP server "error" event.
 * @param {Error} error an error message
 * @returns {null} error already logged exits process
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    return logger.error(error.message)
  }

  switch (error.code) {
    case 'EACCES':
      logger.error('port requires elevated privileges')
      return isTestMode || process.exit(1)
    case 'EADDRINUSE':
      logger.error('port is already in use')
      return isTestMode || process.exit(1)
    default:
      return logger.error(error.message)
  }
}

app.use(helmet(), postGraphqlMiddleware)

server.on('listening', onListening.bind(null, server)).on('error', onError)

// Only run this section if file is loaded directly (eg `node app.js`)
// module loaded by something else eg. test or cyclic dependency
// Fixes error: "Trying to open unclosed connection."
if (require.main === module) server.listen(PORT)

module.exports = { app, server, onError, onListening, isDevMode }
