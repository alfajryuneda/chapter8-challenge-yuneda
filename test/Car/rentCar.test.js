const request = require('supertest');
const dayjs = require('dayjs');
const app = require('../../app');

dayjs().format();

describe('POST /v1/cars/:id/rent', () => {
  let carResponse;
  let accessTokenAdmin;
  let accessTokenCustomer;
  let customer;
  const rentStartedAt = dayjs().add(1, 'day');
  const rentEndedAt = dayjs(rentStartedAt).add(1, 'day');

  beforeAll(async () => {
    accessTokenAdmin = await request(app)
      .post('/v1/auth/login').send({
        email: 'fikri@binar.co.id',
        password: '123456',
      });
    // console.log(accessTokenAdmin.body.accessToken);

    accessTokenCustomer = await request(app)
      .post('/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'yuneda',
        email: 'yuhu@gmail.com',
        password: 'yuneda',
      });

    carResponse = await request(app)
      .post('/v1/cars')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessTokenAdmin.body.accessToken}`)
      .send({
        name: 'Lamborghini Aventador Baru Coy',
        price: 2500000,
        size: 'LARGE',
        image: 'https://source.unsplash.com/500x500',
      });

    return carResponse;
  });

  afterAll(async () => {

  });

  it('pinjam mobil', () => {
    return request(app)
      .post(`/v1/cars/${carResponse.body.id}/rent`)
      .set('Authorization', `Bearer ${accessTokenCustomer.body.accessToken}`)
      .set('Content-Type', 'application/json')
      .send({ rentStartedAt, rentEndedAt })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(res.body);
      });
  });

  it('pinjam mobil yg udah dipinjem', () => {
    return request(app)
      .post(`/v1/cars/${carResponse.body.id}/rent`)
      .set('Authorization', `Bearer ${accessTokenCustomer.body.accessToken}`)
      .set('Content-Type', 'application/json')
      .send({ rentStartedAt, rentEndedAt })
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(res.body);
      });
  });
});
