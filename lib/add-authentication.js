const defaults = {
  secret: undefined,
  key: '_apiKey'
}

/**
 * This adds the _apiKey to data being sent
 * @param {object} options
 */
module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  if (!options.secret) {
    throw new Error('A `secret` must be provided to the addAuthenticationToData hook.')
  }

  return function addAuthentication (context) {
    if (context.type !== 'before') {
      throw new Error('addAuthentication can only be used as a before hook.')
    }

    if (context.method === 'get' || context.method === 'find' || context.method === 'remove') {
      // Add to query
      if (!context.params.query) {
        context.params.query = {}
      }
      Object.assign(context.params.query, { [options.key]: options.secret })
    } else {
      // Add to data
      ;[].concat(context.data).forEach(item => addAuth(item, options))
    }

    return context
  }
}

/**
 * Adds a secret to a given path from options.key
 * @param {object} data
 * @param {object} options
 */
function addAuth (data, options) {
  const { secret, key } = options

  data[key] = secret

  return data
}
