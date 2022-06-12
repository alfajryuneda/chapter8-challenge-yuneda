const request = require('supertest');
const app = require('../../app');
const { Car } = require('../../app/models');

let car;
describe('Cars', () => {
  beforeAll(async () => {
    car = await Car.create({
      name: 'Mobil Batman',
      price: 20000,
      size: 'SMALL',
      image: 'car.jpg',
      isCurrentlyRented: false,
    });
    return car;
  });
  afterAll(() => car.destroy());
  it('Get spesific car', () => {
    return request(app)
      .get(`/v1/cars/${car.id}`)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          size: expect.any(String),
          image: expect.any(String),
          isCurrentlyRented: expect.any(Boolean),
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        });
      });
  });
});
