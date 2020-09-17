import server from '../app'
import { expect } from 'chai'
import supertest from 'supertest'
import models from '../models'

const chai = require('chai')
const should = chai.should()

const request = supertest.agent(server)
const gamesModel = models.Games
let newGames = {}
let gamesToDelete = {}

describe('Games Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    // add a games to the database
    await gamesModel.create({
      title: 'test games',
      genres: 'action',
      rating: 5,
      likes: 700,
      year: 2020,
      developer: 'Usman Tijani',
      description: 'Just a random test games'
    })

    newGames = await gamesModel.create({
      title: '100ft Robot Golf',
      genres: 'Sports',
      rating: 7,
      likes: 110,
      year: 2023,
      developer: 'Usman Tijani',
      description: 'No Goblin'
    })

    gamesToDelete = await gamesModel.create({
      title: 'Pes 2021',
      genres: 'Sport',
      rating: 500,
      year: 2021,
      description: 'Pro Evolution Soccer'
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

  // Test Get all games
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

  //update games test
  describe('Update games route', () => {
    it('should UPDATE a games given the id', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: 'How to make nigerians suffer',
          genres: 'Action',
          developer: 'Tijani',
          year: '2022',
          description: 'Just a random test games'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).be.equal('Games updated successfully')
          done()
        })
    })
    it('should return games with this id does not exist', (done) => {
      request
        .put('/games/123456')
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          developer: 'Jt Tomwest',
          year: '2005',
          publisher: 'coding class',
          description: 'Just a random test games'
        })
        .end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal('Games not found')
          done()
        })
    })
    it('should return Year must be a number if the year passed isnt a number', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          developer: 'ogenyi Janet',
          year: 'yes',
          publisher: 'coding class',
          description: 'Just a random test games'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Year must be a number')
          done()
        })
    })
    it('should return title cannot be empty if user doesnt put a title', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: '',
          genres: 'comedy',
          developer: 'Usman Tijani',
          year: 2020,
          publisher: 'coding class',
          description: 'Just a random test games'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Title cannot be empty')
          done()
        })
    })

    it('should return developer cannot be empty if user doesnt put a developer', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          developer: '',
          cast: 'coding class',
          plot: 'Just a random games',
          year: '1999'
        })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.message).be.equal('Games updated successfully')
          done()
        })
    })

    // Add games test
    describe('Add games route', () => {
      it('should Add Games', (done) => {
        request
          .post('/games')
          .send({
            title: 'Orange is the new black',
            genres: 'Drama',
            developer: 'Joy',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: '2009'
          })
          .end((err, res) => {
            res.status.should.be.equal(201)
            expect(res.body.message).be.equal('Game added successfully')
            done()
          })
      })
      it('should Add Games when id does not exist', (done) => {
        request
          .post('/games/2222')
          .send({
            title: 'Orange is the new black',
            genres: 'Drama',
            developer: 'Joy',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: '2009'
          })
          .end((err, res) => {
            res.status.should.be.equal(404)
            expect(res.body.message).be.equal(undefined)
            done()
          })
      })
      it('should return Year must be a number if the year passed isnt a number', (done) => {
        request
          .post('/games')
          .send({
            title: 'Orange is the new black',
            genres: 'Drama',
            developer: 'Joy',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: 'hey'
          })
          .end((err, res) => {
            res.status.should.be.equal(400)
            expect(res.body.message).be.equal('Year must be a number')
            done()
          })
      })
      it('should return title cannot be empty if user doesnt put a title', (done) => {
        request
          .post('/games')
          .send({
            title: '',
            genres: 'Drama',
            developer: 'Joy',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: '2009'
          })
          .end((err, res) => {
            res.status.should.be.equal(400)
            expect(res.body.message).be.equal('Title cannot be empty')
            done()
          })
      })
      it('should return developer cannot be empty if user doesnt put an developer', (done) => {
        request
          .post('/games')
          .send({
            title: 'Orange is the new black',
            genres: 'Drama',
            developer: '',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: '2009'
          })
          .end((err, res) => {
            res.status.should.be.equal(201)
            expect(res.body.message).be.equal('Game added successfully')
            done()
          })
      })
    })
    
// Get Games By Title
    describe('Get Games By title route', () => {
      it('should get games by title', (done) => {
        request
          .get('/games/title')
          .query({ title: 'How to get away with murder' })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
    })

    describe('Delete games', () => {
      it('should DELETE a Game given the id', (done) => {
        request.delete(`/games/${gamesToDelete.id}`).end((err, res) => {
          res.status.should.be.equal(204)
          done()
        })
      })
      it('should return Games does not exist', (done) => {
        request.delete('/games/070334').end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal('Games not found')
          done()
        })
      })
    })

    describe('Get single games', () => {
      it('should GET a games by id', (done) => {
        request.get(`/game/${newGames.id}`).end((err, res) => {
          res.status.should.be.equal(200)
          res.body.should.be.a('object')
          expect(res.body.games).to.have.property('title')
          expect(res.body.games).to.have.property('rating')
          expect(res.body.games).to.have.property('year')
          done()
        })
      })
      it('it should GET a games by id', (done) => {
        request.get('/game/8888').end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).to.equal('games not found')
          done()
        })
      })
    })

    describe('Get games By genres route', () => {
      it('should get games by genres', (done) => {
        request
          .get('/games/genres')
          .query({ genres: 'update RnB' })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
    })

    describe('Get games By rating', () => {
      it('should get games by rating', (done) => {
        request
          .get('/games/rating')
          .query({ rating: '5' })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.games).to.be.an('array')
            done()
          })
      })
      it('should get games by rating greater than', (done) => {
        request
          .get('/games/rating/')
          .query({ rating_greater_than: '5' })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.games).to.be.an('array')
            done()
          })
      })
      it('should get games by rating less than', (done) => {
        request
          .get('/games/rating/')
          .query({ rating_less_than: '5' })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.games).to.be.an('array')
            done()
          })
      })
    })

    describe('Get games By likes Route', () => {
      it('should get games by likes', (done) => {
        request
          .get('/games/likes')
          .query({ likes: 500 })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
      it('should get games by likes greater than', (done) => {
        request
          .get('/games/likes')
          .query({ likes_greater_than: 300 })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
      it('should get games by likes less than', (done) => {
        request
          .get('/games/likes')
          .query({ likes_less_than: 300 })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
    })

    describe('Get games By Year Route', () => {
      it('should get games by year', (done) => {
        request
          .get('/games/year')
          .query({ year: 2018 })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
      it('should get games by year greater than', (done) => {
        request
          .get('/games/year')
          .query({ year_greater_than: 2005 })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
      it('should get games by year less than', (done) => {
        request
          .get('/games/year')
          .query({ year_less_than: 2002 })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
    })

    describe('Get games By description route', () => {
      it('should get games by description', (done) => {
        request
          .get('/games/description')
          .query({ description: 'update description test' })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
    })
  })
})
