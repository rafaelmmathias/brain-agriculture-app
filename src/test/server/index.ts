import codegen from 'codegen.macro'

/**
 * When running in dev, we use mock with dev-server
 * When running tests, we use mock with test-server
 * If is production mode, we do not mock anything.
 * So, to run in production, make sure to have an API running
 * on the .env file endpoint.
 */

codegen`
if (process.env.NODE_ENV === 'development') {
  module.exports = "export * from './dev-server'"
} else if (process.env.NODE_ENV === 'test') {
  module.exports = "export * from './test-server'"
} else {
  module.exports = ""
}
`