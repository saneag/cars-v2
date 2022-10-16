
import { assert } from "chai";
import request from 'request'

describe('Get /cars', () => {
    it('should return all cars', (done) => {
        request.get('http://localhost:5000/cars', (err, res, body) => {
            assert.equal(res.statusCode, 200)
            done()
        })
    })
})

describe('Get /cars/:id', () => {
    it('should return one car by id', (done) => {
        request.get('http://localhost:5000/cars/62cde089bd2f9fb1e2a7d772', (err, res, body) => {
            assert.equal(res.statusCode, 200)
            done()
        })
    })
})

describe('Login user', () => {
    it('should login user', (done) => {
        request.post('http://localhost:5000/auth/login', {
            json: {
                name: 'test',
                email: 'test@test.com',
                password: 'test123'
            }
        }, (err, res, body) => {
            assert.equal(res.statusCode, 200)
            done()
        })
    })
})