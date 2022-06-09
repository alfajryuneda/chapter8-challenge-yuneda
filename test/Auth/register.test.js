const request = require('supertest');
const app = require('../../app');
const { User } = require('../../app/models');

describe('User', () => {
  let user;
  afterAll(async () => {
    user = await User.destroy({
      where: {
        email: 'yuneda@gmail.com',
      },
    });
  });
  it('Register user', () => {
    return request(app)
      .post('/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'yuneda',
        email: 'yuneda@gmail.com',
        password: 'yuneda',
      })
      .expect(201);
  });
  it('Register user with same email', () => {
    return request(app)
      .post('/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'achmad',
        email: 'yuneda@gmail.com',
        password: 'achmad',
      })
      .expect(422);
  });
});
