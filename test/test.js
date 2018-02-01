process.env.NODE_ENV = 'test';
var chai = require('chai');
var app = require ('../index.js');
var supertest = require('supertest');
var request = supertest(app);

describe ('test rest', () => {
  it('Return the homepage with message', (done) => {
    request.get('/')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.eql("Hello World! My first App!");
        done(err);
      });
  });
});
