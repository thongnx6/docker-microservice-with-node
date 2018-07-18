var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('User API', () => {

  // Our running app (rebuilt for each test) and our repo, which
  // we can mock for test
  let app = null;
  let testUsers = [
    {
      email: 'homer@toilaptrinh.com',
      phone_number: '+1 234 5678'
    },
    {
      email: 'magre@toilaptrinh.com',
      phone_number: '+1 234 5679'
    }
  ];
  let testRepo = {
    getUsers: () => {
      return Promise.resolve(testUsers);
    },
    getUserByEmail: (email) => {
      return Promise.resolve(testUsers.find((user) => {
        return user.email === email;
      }));
    }
  };

  beforeEach(() => {
    return server.start({
      port: 1234,
      repository: testRepo
    }).then((svr) => {
      app = svr;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can return all users', (done) => {

    request(app)
      .get('/users')
      .expect((res) => {
        res.body.should.containEql({
          email: 'homer@toilaptrinh.com',
          phoneNumber: '+1 234 5678'
        });
        res.body.should.containEql({
          email: 'magre@toilaptrinh.com',
          phoneNumber: '+1 234 5679'
        });
      })
      .expect(200, done);

  });

  it('return a 404 for a unknow user', (done) => {

    request(app)
      .get('/search?email=barnie@toilaptrinh.com')
      .expect(404, done);

  });

  it('return a 200 for a know user', (done) => {

    request(app)
      .get('/search?email=homer@toilaptrinh.com')
      .expect(200, done);

  });

});