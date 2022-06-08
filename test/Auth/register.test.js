const request = require('supertest');
const app = require('../../app');

describe('User', () => {
  it('Register user', () => {
    return request(app)
      .post('/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'yuneda',
        email: 'yuneda3@gmail.com',
        password: 'yuneda',
      })
      .expect(201);
  });
});
