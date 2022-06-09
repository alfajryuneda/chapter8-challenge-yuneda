const request = require('supertest');
const app = require('../../app');
const { Car } = require('../../app/models');

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
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZpa3JpIiwiZW1haWwiOiJmaWtyaUBiaW5hci5jby5pZCIsImltYWdlIjpudWxsLCJyb2xlIjp7ImlkIjoyLCJuYW1lIjoiQURNSU4ifSwiaWF0IjoxNjU0NzUyNTc5fQ.F1utf1y6-66XCIL7Ql4htirTLXwRQcNvuq-Ob-crQZw',
      )
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });

  it('should response with 404 as status code', async () => {
    return request(app)
      .delete('/v1/cars/-100')
      .then((res) => {
        expect(res.statusCode).toBe(401);
        // expect(res.body).toEqual(
        //   expect.objectContaining({
        //     error: {
        //       name: expect.any(String),
        //       message: expect.any(String),
        //     },
        //   }),
        // );
      });
  });
});
