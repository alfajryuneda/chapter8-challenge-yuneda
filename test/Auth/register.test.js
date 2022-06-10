const request = require('supertest');
const app = require('../../app');
const { User } = require('../../app/models');

describe('User', () => {
  let user;
  afterAll(async () => {
    user = await User.destroy({
      where: {
        email: 'rochim@gmail.com',
      },
    });
  });
  it('Register user', () => {
    return request(app)
      .post('/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'yuneda',
        email: 'rochim@gmail.com',
        password: 'yuneda',
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
  it('Register user with same email', () => {
    return request(app)
      .post('/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'achmad',
        email: 'rochim@gmail.com',
        password: 'achmad',
      })
      .expect(422);
  });
});
