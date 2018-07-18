// config.js
//
// Simple application configuration. Extend as needed.
// We can *require* config as needed. Currently, most config
// is hard coded, but as you can see from *port* it's easy
// to add environment variables as an option.
'use strict';

module.exports = {
  port: process.env.PORT || 8123,
  db: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    database: 'users',
    user: 'users_service',
    password: '123',
    port: 3306
  }
};