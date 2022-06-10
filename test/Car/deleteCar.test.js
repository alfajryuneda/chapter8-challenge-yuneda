const request = require('supertest');
const app = require('../../app');
const { Car } = require('../../app/models');

let accessToken;
beforeAll(async () => {
  const response = await request(app)
    .post('/v1/auth/login')
    .send({
      email: 'johnny@binar.co.id',
      password: '123456',
    });
  accessToken = response.body.accessToken;
});
describe('DELETE /v1/tasks/:id', () => {
  let car;

  beforeEach(async () => {
    car = await Car.create({
      name: 'Daihatsu Baru',
      price: 20000,
      size: 'SMALL',
      image: 'car.jpg',
      isCurrentlyRented: false,
    });

    return car;
  });

  afterEach(() => car.destroy());

  it('should response with 200 as status code', async () => {
    return request(app)
      .delete(`/v1/cars/${car.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
});
