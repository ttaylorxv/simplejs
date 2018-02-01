process.env.NODE_ENV = 'test';

describe ('test rest', () => {
  it('Return the homepage with message', (done) => {
    request.get('/tasks')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.lengthOf(2);
        done(err);
      });
  });
});
