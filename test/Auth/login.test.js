const request = require('supertest');
const app = require('../../app');

let accessToken;
describe('POST /v1/auth/login', () => {
  const email = 'Fikri@binar.co.id';
  const password = '123456';
  const notRegisteredEmail = 'spiderman@binar.co.id';
  it('Login user', () => {
    return request(app)
      .post('/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        email,
        password,
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            accessToken: expect.any(String),
          }),
        );
      });
  });
  it('Login user where email is not registered', () => {
    return request(app)
      .post('/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: notRegisteredEmail,
        password,
      })
      .expect(404);
  });
  it('Login user where password is wrong', () => {
    return request(app)
      .post('/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        email,
        password: 'batman',
      })
      .expect(401);
  });
});
