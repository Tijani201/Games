import server from '../app'
import { expect } from 'chai'
import supertest from 'supertest'
import models from '../models'

const chai = require('chai')
const should = chai.should()

const request = supertest.agent(server)
const gamesModel = models.Games
let newGames = {}

describe('Games Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    // add a games to the database
    await gamesModel.create({
      title: 'test games',
      genres: 'comedy',
      rating: 5,
      likes: 700,
      year: 2020,
      description: 'Just a random test games'
    })
    newGames = await gamesModel.create({
      title: 'Beds of Lies',
      genres: 'Musical',
      rating: 7,
      likes: 110,
      year: 2023,
      description: 'Just nicki minaj song'
    })
  })
  after(async () => {
    // empty the database
    await gamesModel.destroy({ where: {} })
  })

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

  describe('Update games route', () => {
    it('should UPDATE a games given the id', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: 'How to make nigerians suffer',
          genres: 'Action',
          writers: 'Tijani',
          cast: 'Buhari APC',
          plot: 'Just a random test games',
          year: '2022'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).be.equal('Games updated successfully')
          done()
        })
    })
  })
})
