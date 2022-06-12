const request = require('supertest');
const app = require('../../../../app/index');
const { UserCar } = require('../../../../app/models');

let accessToken;
const carId = 8;

let userCarModel;
afterAll(async () => {
  userCarModel = UserCar;
  await userCarModel.destroy({where: { carId: 8 }})
})

beforeAll(async () => {
  const response = await request(app)
    .post('/v1/auth/login')
    .send({
      email: 'fikri@binar.co.id',
      password: '123456',
    });
  accessToken = response.body.accessToken
});

describe('POST /v1/cars/:id/rent = 8', function () {
  it('should need auth', () => {
      return request(app)
          .post('/v1/cars/' + carId + '/rent')
          .send({
              'rentStartedAt': '2022-06-07T22:20:55.029Z',
              'rentEndedAt': '2022-06-07T22:20:55.029Z'
          })
          .expect('Content-Type', /json/)
          .expect(401)
    })
    it('should be 200 and response object', () => {
        return request(app)
            .post('/v1/cars/' + carId + '/rent')
            .send({
                'rentStartedAt': '2022-06-07T22:20:55.029Z',
                'rentEndedAt': '2022-06-07T22:20:55.029Z'
            })
            .set('Authorization', 'Bearer ' + accessToken)
            .expect('Content-Type', /json/)
            .then((response) =>{
                expect(response.statusCode).toEqual(201)
                expect(response.body).toMatchObject({
                    id: expect.any(Number),
                    carId: expect.any(Number),
                    userId: expect.any(Number),
                    rentStartedAt: expect.any(String),
                    rentEndedAt: expect.any(String)
                })
            })
    })
    it('should be 422 and already rented', () => {
        return request(app)
            .post('/v1/cars/' + carId + '/rent')
            .send({
                'rentStartedAt': '2022-06-07T22:20:55.029Z',
                'rentEndedAt': '2022-06-07T22:20:55.029Z'
            })
            .set('Authorization', 'Bearer ' + accessToken)
            .expect('Content-Type', /json/)
            .then((response) =>{
                expect(response.statusCode).toEqual(422)
                expect(response.body).toMatchObject({
                    error: {
                        name: expect.any(String),
                        message: expect.any(String),
                        details: {
                            car: expect.any(Object)
                        },
                    }
                })
            })
    })
});