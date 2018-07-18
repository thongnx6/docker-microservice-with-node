var request = require('supertest');
var should  = require('should');
var server = require('./server');

describe('Server', () => {

  if('should required a port to start', () => {
    return server.start({
      repository: {}
    }).should.be.rejectedWith(/port/);
  });

  it('should require a repository to start', () => {
    return server.start({
      port: {}
    }).should.be.rejectedWith(/repository/);
  });

});
