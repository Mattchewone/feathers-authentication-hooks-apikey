const { expect } = require('chai')
const plugin = require('../lib')

describe('feathers-authentication-hooks-apikey', () => {
  it('basic functionality', () => {
    expect(typeof plugin).to.equal('object', 'It worked')
  })
})
