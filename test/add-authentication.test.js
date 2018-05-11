const assert = require('assert')
const addAuthentication = require('../lib/add-authentication')

const secret = 'my-super-secret'

describe('addAuthentication hook:', function () {
  it('throws if no secret is passed into the hook setup', function (done) {
    try {
      addAuthentication()
    } catch (error) {
      assert(error.message === 'A `secret` must be provided to the addAuthenticationToData hook.')
      done()
    }
  })

  it('adds authentication to data as object', function () {
    const context = {
      type: 'before',
      method: 'create',
      params: {
        provider: 'rest'
      },
      data: { id: 1 }
    }

    addAuthentication({ secret })(context)

    assert(context.data._apiKey, 'we have added the _apiKey')
    assert(context.data._apiKey === secret, '_apiKey is correct')
  })

  it('adds authentication to data as array', function () {
    const context = {
      type: 'before',
      method: 'create',
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

  it('adds authentication to find query', function () {
    const context = {
      type: 'before',
      method: 'find',
      params: {
        provider: 'rest'
      }
    }

    addAuthentication({ secret })(context)

    assert(context.params.query._apiKey, 'we have added the _apiKey')
    assert(context.params.query._apiKey === secret, '_apiKey is correct')
  })

  it('adds authentication to get query', function () {
    const context = {
      type: 'before',
      method: 'get',
      params: {
        provider: 'rest'
      }
    }

    addAuthentication({ secret })(context)

    assert(context.params.query._apiKey, 'we have added the _apiKey')
    assert(context.params.query._apiKey === secret, '_apiKey is correct')
  })

  it('adds authentication to find query with existing query params', function () {
    const context = {
      type: 'before',
      method: 'get',
      params: {
        provider: 'rest',
        query: {
          id: 1
        }
      }
    }

    addAuthentication({ secret })(context)

    assert(context.params.query._apiKey, 'we have added the _apiKey')
    assert.equal(context.params.query._apiKey, secret, '_apiKey is correct')
    assert.equal(context.params.query.id, 1, 'we do not have the existing query.id')
  })
})
