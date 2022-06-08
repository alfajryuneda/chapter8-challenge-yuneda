const request = require('supertest');
const app = require('../../app');

describe('User', () => {
  it('Login user', () => {
    return request(app)
      .post('/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'Fikri@binar.co.id',
        password: '123456',
      })
      .expect(201);
  });
});
