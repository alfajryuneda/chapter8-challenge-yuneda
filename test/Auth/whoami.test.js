const request = require('supertest');
const app = require('../../app');
const { User } = require('../../app/models');

let accessTokenAdmin;
let accessTokenCustomer;
let user;
beforeAll(async () => {
  const response = await request(app)
    .post('/v1/auth/login')
    .send({
      email: 'johnny@binar.co.id',
      password: '123456',
    });
  accessTokenAdmin = response.body.accessToken;
});
beforeAll(async () => {
  user = await request(app)
    .post('/v1/auth/register')
    .send({
      name: 'achmadyual',
      email: 'achmadyual3@binar.co.id',
      password: 'achmadyual',
    });
  accessTokenCustomer = user.body.accessToken;
});
afterAll(async () => {
  await User.destroy({
    where: {
      email: 'achmadyual3@binar.co.id',
    },
  });
});
describe('User', () => {
  it('Define who logged in (CUSTOMER)', () => {
    return request(app)
      .get('/v1/auth/whoami')
      .set('Accept', 'application/json')
      .set(
        'Authorization',
        `Bearer ${accessTokenCustomer}`,
      )
      .expect(200);
  });
  it('Define who logged in (ADMIN)', () => {
    return request(app)
      .get('/v1/auth/whoami')
      .set('Accept', 'application/json')
      .set(
        'Authorization',
        `Bearer ${accessTokenAdmin}`,
      )
      .expect(401);
  });
});
