import server from '../app'
import { expect } from 'chai'
import supertest from 'supertest'

const chai = require('chai')
const should = chai.should()

const request = supertest.agent(server)

describe('Games Api', () => {
  describe('Index route', () => {
    it('should return welcome message when / route is matched', (done) => {
      request.get('/').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.message).be.equal('Welcome to Games Api')
        done()
      })
    })
  })
})
