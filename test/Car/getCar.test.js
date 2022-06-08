const request = require('supertest');
const app = require('../../app');

describe('Cars', () => {
  it('Get spesific car', () => {
    return request(app)
      .post('/v1/cars')
      .set('Accept', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkZpa3JpIiwiZW1haWwiOiJmaWtyaUBiaW5hci5jby5pZCIsImltYWdlIjpudWxsLCJyb2xlIjp7ImlkIjoyLCJuYW1lIjoiQURNSU4ifSwiaWF0IjoxNjU0NjU2MDE4LCJleHAiOjE2NTQ3NDI0MTh9.sysMw_ZESK7Sj_E6T3Fm0_PkrDhq6zUoHMpy28PYobg',
      )
      .send({
        name: 'Xenia Ariawan',
        price: 0,
        image: 'string',
        size: 'string',
      })
      .expect(201);
  });
});
