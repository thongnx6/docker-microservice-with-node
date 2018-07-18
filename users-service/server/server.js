// server.js
//
// Using express setup server
'use strict';

var express = require('express');
var morgan = require('morgan');

module.exports.start = (option) => {

  return new Promise((resolve, reject) => {

    // Make sure we have a reposiotry and port provided.
    if(!option.repository) throw new Error("A server must be started with a connected repository.");
    if(!option.port) throw new Error("A server must be started  with a port");

    // Create the app. add some logging.
    let app = express();
    app.use(morgan('dev'));

    // Add the APIs to the app.
    require('../api/users')(app, option);

    // Start the app, creating a running server which we return.
    let server = app.listen(option.port, () => {
      resolve(server);
    });

  });

};
