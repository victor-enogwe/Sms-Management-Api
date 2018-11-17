const { postgraphile } = require(`postgraphile`)
const { isDevMode, DATABASE_URL, JWT_SECRET } = require('../utils')

let graphQlConfig = {
  watchPg: isDevMode,
  simpleSubscriptions: true,
  websocketMiddlewares: [],
  dynamicJson: true,
  graphiqlRoute: '/',
  showErrorStack: isDevMode,
  disableQueryLog: !isDevMode,
  extendedErrors: 'detail',
  jwtSecret: JWT_SECRET,
  legacyJsonUuid: false,
  ignoreRBAC: false,
  bodySizeLimit: '200kB',
  enableQueryBatching: true,
  graphiql: true
}

/**
 * PostGraphQl Middleware
 *
 * @export
 * @param {Object} req the http request object
 * @param {Object} res the http response object
 *
 * @returns {Object} the http json response
 */
function postGraphqlMiddleware (req, res) {
  const schemas = ['public']
  return postgraphile(DATABASE_URL, schemas, graphQlConfig)(req, res)
}

module.exports = { postGraphqlMiddleware }
