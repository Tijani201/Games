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

  describe('/GET Get all games', () => {
    it('it should GET all the games', (done) => {
      request.get('/games').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.games).to.be.an('array')
        expect(res.body.message).be.equal('Games fetched successfully')
        done()
      })
    })
  })
})


