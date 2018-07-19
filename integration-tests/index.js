// index.js
//
// Entry-point for the our service integration test.
// Note that due to:
//
// https://github.com/visionmedia/supertest/issues/314
//
// If the service isn't running, you'll get failures like:
//
// Cannot read property 'status' of underfined
//
// For test failures.
var supertest = require('supertest');
var should = require('should');

describe('users-service', () => {

  let api = supertest('http://localhost:8123');

  it('returns a 200 for a know user', (done) => {
    api.get('/search?email=homer@toilaptrinh.com')
      .expect(200, done);
  });

});
