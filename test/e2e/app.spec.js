const { expect, app, logger } = require('../helpers')

describe('App', () => {
  describe('- Server', () => {
    it('should be started', () => app.get('/')
      .then((response) => {
        expect(response.status).to.equal(200)
        expect(logger.info.called).to.equal(true)
      }))
  })
})
