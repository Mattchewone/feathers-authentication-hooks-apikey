# feathers-authentication-hooks-apikey

[![Build Status](https://travis-ci.org/feathersjs/feathers-authentication-hooks-apikey.png?branch=master)](https://travis-ci.org/feathersjs/feathers-authentication-hooks-apikey)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-authentication-hooks-apikey/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-authentication-hooks-apikey)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-authentication-hooks-apikey/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-authentication-hooks-apikey/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-authentication-hooks-apikey.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-authentication-hooks-apikey)
[![Download Status](https://img.shields.io/npm/dm/feathers-authentication-hooks-apikey.svg?style=flat-square)](https://www.npmjs.com/package/feathers-authentication-hooks-apikey)

> Add custom authentication to your data

## Installation

```
npm install feathers-authentication-hooks-apikey --save
```

## Documentation

TBD

## Complete Example

Here's an example of a Feathers server that uses `feathers-authentication-hooks-apikey`. 

```js
const feathers = require('@feathersjs/feathers');
const plugin = require('feathers-authentication-hooks-apikey');

// Initialize the application
const app = feathers();

// Initialize the plugin
app.configure(plugin());
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
