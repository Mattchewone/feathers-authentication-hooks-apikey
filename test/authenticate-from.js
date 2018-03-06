const assert = require('assert')
const authenticateFrom = require('../lib/authenticate-from')

const secret = 'my-super-secret'

describe('AuthenticateFrom hook:', function () {
  it('throws if no secret is passed into the hook setup', function () {
    try {
      authenticateFrom()
    } catch (error) {
      assert(error.message === 'A `secret` must be provided to the authenticateFrom hook.')
    }
  })

  describe('Query:', function () {
    it('validates when required the query _apiKey', function () {
      const context = {
        params: {
          provider: 'rest',
          query: { _apiKey: secret }
        }
      }
      authenticateFrom({ path: 'params.query', secret, required: true })(context)

      assert(context, 'we have no error')
      assert(!context.params.query._apiKey, 'the _apiKey was removed')
      assert(context.params.provider === undefined, 'provider was unset')
      assert(context.params.isAuthenticatedWithApiKey, 'isAuthenticated was set')
    })

    it('throws when required and query _apiKey', function () {
      const context = {
        params: {
          provider: 'rest',
          query: { _apiKey: 'wrong-query-secret' }
        }
      }
      try {
        authenticateFrom({ path: 'params.query', secret, required: true })(context)
      } catch (error) {
        assert(error.className === 'forbidden', 'error has correct className')
      }
    })

    it('validated when not required and no _apiKey or query is provided', function () {
      const context = {
        params: {
          provider: 'rest'
        }
      }
      authenticateFrom({ path: 'params.query', secret, required: false })(context)

      assert(context, 'we have no error')
      assert(context.params.provider === 'rest', 'provider was not changed')
      assert(!context.params.isAuthenticatedWithApiKey, 'isAuthenticated was not set')
    })

    it('validated when not required and no _apiKey is provided', function () {
      const context = {
        params: {
          provider: 'rest',
          query: {}
        }
      }
      authenticateFrom({ path: 'params.query', secret, required: false })(context)

      assert(context, 'we have no error')
      assert(!context.params.query._apiKey, 'the _apiKey is not present')
      assert(context.params.provider === 'rest', 'provider was not changed')
      assert(!context.params.isAuthenticatedWithApiKey, 'isAuthenticated was not set')
    })

    it('throws when not required and query _apiKey is incorrect', function () {
      const context = {
        params: {
          provider: 'rest',
          query: { _apiKey: 'wrong-query-secret' }
        }
      }
      try {
        authenticateFrom({ path: 'params.query', secret, required: false })(context)
      } catch (error) {
        assert(error.className === 'forbidden', 'error has correct className')
      }
    })
  })

  describe('Data:', function () {
    describe('Object', function () {
      it('validates when required and has data _apiKey', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: { id: 1, _apiKey: secret }
        }
        authenticateFrom({ path: 'data', secret, required: true })(context)

        assert(context, 'we have no error')
        assert(!context.data._apiKey, 'the _apiKey was removed')
        assert(context.data.id === 1, 'data was not affected')
        assert(context.params.provider === undefined, 'provider was unset')
        assert(context.params.isAuthenticatedWithApiKey, 'isAuthenticated was set')
      })

      it('throws when required and _apiKey is incorrect', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: { id: 1, _apiKey: 'fake-wrong-secret' }
        }
        try {
          authenticateFrom({ path: 'data', secret, required: true })(context)
        } catch (error) {
          assert(error.className === 'forbidden', 'error has correct className')
        }
      })

      it('validated when not required and no _apiKey is provided', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: { id: 1 }
        }
        authenticateFrom({ path: 'data', secret, required: false })(context)

        assert(context, 'we have no error')
        assert(!context.data._apiKey, 'the _apiKey is not present')
        assert(context.data.id === 1, 'data not affected')
        assert(context.params.provider === 'rest', 'provider was not changed')
        assert(!context.params.isAuthenticatedWithApiKey, 'isAuthenticated was not set')
      })

      it('throws when not required and _apiKey provided is incorrect', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: { id: 1, _apiKey: 'fake-wrong-secret' }
        }
        try {
          authenticateFrom({ path: 'data', secret, required: false })(context)
        } catch (error) {
          assert(error.className === 'forbidden', 'error has correct className')
        }
      })
    })

    describe('Array', function () {
      it('validates the data _apiKey when required', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: [
            { id: 1, _apiKey: secret },
            { id: 2, _apiKey: secret },
            { id: 3, _apiKey: secret }
          ]
        }
        authenticateFrom({ path: 'data', secret, required: true })(context)

        assert(context, 'we have no error')
        assert(context.params.provider === undefined, 'provider was unset')
        assert(context.params.isAuthenticatedWithApiKey, 'isAuthenticated was set')

        context.data.forEach(data => {
          assert(!data._apiKey, '_apiKey was removed')
          assert(data.hasOwnProperty('id'), 'has the id property')
        })
      })

      it('throws when required and _apiKey is incorrect', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: [
            { id: 1, _apiKey: 'fake-wrong-secret' },
            { id: 2, _apiKey: 'fake-wrong-secret' },
            { id: 3, _apiKey: 'fake-wrong-secret' }
          ]
        }
        try {
          authenticateFrom({ path: 'data', secret, required: true })(context)
        } catch (error) {
          assert(error.className === 'forbidden', 'error has correct className')
        }
      })

      it('validated when not required and no _apiKey is provided', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: [
            { id: 1 },
            { id: 2 },
            { id: 3 }
          ]
        }
        authenticateFrom({ path: 'data', secret, required: false })(context)

        assert(context, 'we have no error')
        assert(context.params.provider === 'rest', 'provider was not changed')
        assert(!context.params.isAuthenticatedWithApiKey, 'isAuthenticated was not set')

        context.data.forEach(data => {
          assert(!data._apiKey, 'the _apiKey is not present')
          assert(data.hasOwnProperty('id'), 'data has id property')
        })
      })

      it('validated when not required and _apiKey is provided', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: [
            { id: 1, _apiKey: secret },
            { id: 2, _apiKey: secret },
            { id: 3, _apiKey: secret }
          ]
        }
        authenticateFrom({ path: 'data', secret, required: false })(context)

        assert(context, 'we have no error')
        assert(context.params.provider === undefined, 'provider was removed')
        assert(context.params.isAuthenticatedWithApiKey, 'isAuthenticated was set')

        context.data.forEach(data => {
          assert(!data._apiKey, 'the _apiKey is not present')
          assert(data.hasOwnProperty('id'), 'data has id property')
        })
      })

      it('throws when not required and _apiKey is incorrect', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: [
            { id: 1, _apiKey: 'wrong-fake-secret' },
            { id: 2, _apiKey: 'wrong-fake-secret' },
            { id: 3, _apiKey: 'wrong-fake-secret' }
          ]
        }
        try {
          authenticateFrom({ path: 'data', secret, required: false })(context)
        } catch (error) {
          assert(error.className === 'forbidden', 'error has correct className')
        }
      })

      it('throws when not required and _apiKey is incorrect on one item', function () {
        const context = {
          params: {
            provider: 'rest'
          },
          data: [
            { id: 1, _apiKey: secret },
            { id: 2, _apiKey: secret },
            { id: 3, _apiKey: 'wrong-fake-secret' }
          ]
        }
        try {
          authenticateFrom({ path: 'data', secret, required: false })(context)
        } catch (error) {
          assert(error.className === 'forbidden', 'error has correct className')
        }
      })
    })
  })
})
