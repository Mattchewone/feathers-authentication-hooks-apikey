# feathers-authentication-hooks-apikey

[![Build Status](https://travis-ci.org/Mattchewone/feathers-authentication-hooks-apikey.png?branch=master)](https://travis-ci.org/Mattchewone/feathers-authentication-hooks-apikey)
[![Code Climate](https://codeclimate.com/github/Mattchewone/feathers-authentication-hooks-apikey/badges/gpa.svg)](https://codeclimate.com/github/Mattchewone/feathers-authentication-hooks-apikey)
[![Test Coverage](https://codeclimate.com/github/Mattchewone/feathers-authentication-hooks-apikey/badges/coverage.svg)](https://codeclimate.com/github/Mattchewone/feathers-authentication-hooks-apikey/coverage)


> Add custom authentication to your data

## Installation

```
npm i feathers-authentication-hooks-apikey
```

## Documentation

TBD

## Complete Example

Here's an example hook adding authentication using `feathers-authentication-hooks-apikey`. 

```js
const { addAuthentication } = require('feathers-authentication-hooks-apikey')

module.exports = {
  before: {
    find: [ addAuthentication({ secret: 'my-super-secret' }) ],
    patch: [ addAuthentication({ secret: 'my-super-secret' }) ]
  }
}
```

Here's an example hook checking authentication using `feathers-authentication-hooks-apikey`. 

```js
const { authenticateFrom } = require('feathers-authentication-hooks-apikey')

module.exports = {
  before: {
    // if `required: false` it will not fail if the secret is not present
    find: [ authenticateFrom({ path: 'params.query', secret: 'my-super-secret', required: false }) ]
    patch: [ authenticateFrom({ path: 'data', secret: 'my-super-secret', required: true }) ]
  }
}
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
