const assert = require('assert')
const addAuthentication = require('../lib/add-authentication')

const secret = 'my-super-secret'

describe('AuthenticateTo hook:', function () {
  it('throws if no secret is passed into the hook setup', function (done) {
    try {
      addAuthentication()
    } catch (error) {
      assert(error.message === 'A `secret` must be provided to the addAuthenticationToData hook.')
      done()
    }
  })

  describe('Object', function () {
    it('adds authentication to data', function () {
      const context = {
        type: 'before',
        params: {
          provider: 'rest'
        },
        data: { id: 1 }
      }

      addAuthentication({ secret })(context)

      assert(context.data._apiKey, 'we have added the _apiKey')
      assert(context.data._apiKey === secret, '_apiKey is correct')
    })
  })

  describe('Array', function () {
    it('adds authentication to data', function () {
      const context = {
        type: 'before',
        params: {
          provider: 'rest'
        },
        data: [
          { id: 1 },
          { id: 2 },
          { id: 3 }
        ]
      }

      addAuthentication({ secret })(context)

      context.data.forEach(data => {
        assert(data._apiKey, 'we have added the _apiKey')
        assert(data._apiKey === secret, '_apiKey is correct')
      })
    })
  })
})
