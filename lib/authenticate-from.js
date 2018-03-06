const errors = require('@feathersjs/errors')
const { getByDot } = require('feathers-hooks-common')

const defaults = {
  errorMessage: 'ApiKey validation failed.',
  secret: undefined,
  path: 'data',
  required: false,
  key: '_apiKey'
}

/**
 * This checks the _apiKey:
 * - If we have it in the data/query
 * - If it matches the server secret
 */
module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  if (!options.secret) {
    throw new Error('A `secret` must be provided to the authenticateFrom hook.')
  }

  return function authenticateFrom (context) {
    const data = getByDot(context, options.path)

    ;[].concat(data).forEach(item => checkApiKey(item, options))

    if ([].concat(data).every(item => item && item[options.key])) {
      // Remove provider so we can act as a server call
      context.params.provider = undefined
      // Set custom isAuthenticatedWithApiKey prop so if we need to we can check this in another hook
      context.params.isAuthenticatedWithApiKey = true

      ;[].concat(data).forEach(response => {
        delete response[options.key]
      })
    }

    return context
  }
}

/**
 * Checks the secret exists and validates it against
 * the options.secret
 * @param {object} data
 * @param {object} options
 */
function checkApiKey (data, options) {
  const { errorMessage, required, key } = options
  const apiKey = data ? data[key] : undefined

  if (required && !apiKey) {
    throw new errors.Forbidden(errorMessage)
  }

  if (apiKey && apiKey !== options.secret) {
    throw new errors.Forbidden(errorMessage)
  }

  return data
}
