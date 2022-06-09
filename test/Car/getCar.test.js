const request = require('supertest');
const app = require('../../app');

describe('Cars', () => {
  it('Get spesific car', () => {
    return request(app)
      .get('/v1/cars/2')
      .set('Accept', 'application/json')
      .expect(201);
  });
});
