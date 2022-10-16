
import { expect } from "chai";
import request from 'request'

describe('App', () => {
    describe('Database connection', () => {
        it('should connect to database', (done) => {
            request('http://localhost:5000/cars', (err, response, body) => {
                expect(response.statusCode).to.equal(200)
                done()
            })
        });
    })
})