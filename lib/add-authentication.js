const { checkContext } = require('feathers-hooks-common')

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

  return function addAuthenticationToData (context) {
    const { data } = context

    checkContext(context, 'before', null, 'addAuthenticationToData')

    ;[].concat(data).forEach(item => addAuth(item, options))

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
