/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import chai from 'chai'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'
import server from '../app'
import models from '../models'

const request = supertest.agent(server)
const UserModel = models.User

// eslint-disable-next-line no-unused-vars
const should = chai.should()
const { expect } = chai

describe('User test', () => {
  before(async () => {
    // add a user to the database
    await UserModel.create({
      firstName: 'usman',
      lastName: 'Tijani',
      email: 'tijaniusat@gmail.com',
      hash: bcrypt.hashSync('password', 8)
    })
  })
  after(async () => {
    // empty the database
    await UserModel.destroy({ where: {} })
  })

  describe('User Sign up tests', () => {
    // Test Sign up - first name not provided
    it('should return first name is required', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: '',
          lastName: 'Tijani',
          email: 'usmantijani@gmail.com',
          password: 'Mamud4real?'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('First name is required')
          done()
        })
    })

    // Test Sign up - non letters characters provided as first name
    it('should return Only alphabets allowed in first name', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'tj201',
          lastName: 'Tijani',
          email: 'Ujaniusat@gmail.com',
          password: 'Mamud4real?'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'Only alphabets allowed in first name'
          )
          done()
        })
    })

    // Test Sign up - last name not provided
    it('should return last name is required', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'usat',
          lastName: '',
          email: 'usat@gmail.com',
          password: 'Mamud4real?'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Last name is required')
          done()
        })
    })

    // Test Sign up - non letters characters provided as last name
    it('should return Only alphabets allowed in last name', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'usman',
          lastName: 'Tijani22',
          email: 'lusat@gmail.com',
          password: 'Mamud4real?'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'Only alphabets allowed in last name'
          )
          done()
        })
    })

    // Test Sign up - email not provided
    it('should return email is required if no email is provided', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'usman',
          lastName: 'Teejay',
          email: '',
          password: 'Mamud4real?'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Email is required')
          done()
        })
    })

    // Test Sign up - email not valid
    it('should return email invalid if invalid email is provided', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'usman',
          lastName: 'Tijani',
          email: 'tj.com',
          password: 'Mamud4real?'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Email Invalid')
          done()
        })
    })

    // Test Sign up - password not provided
    it('should return password is required', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'usman',
          lastName: 'Tijani',
          email: 'Usmusat@gmail.com',
          password: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Password is required')
          done()
        })
    })
    // Test Sign up - password provided not long enough
    it('should return Password must be at least 8 characters long', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'usman',
          lastName: 'Tijani',
          email: 'usmantijaniusat@gmail.com',
          password: 'p@ss4'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'Password must be at least 8 characters long'
          )
          done()
        })
    })

    // Test Sign up - password with uppercase not provided
    it('should return error if password does not match criteria', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'usman',
          lastName: 'Tijani',
          email: 'usmantijaniusat@gmail.com',
          password: 'letmego'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'Password must be at least 8 characters long'
          )
          done()
        })
    })

    // Test Sign up - user trying to register with an exisiting email
    it('should return User Already Exists', () => {
      request
        .post('/users/signup')
        .send({
          firstName: 'usman',
          lastName: 'Tijani',
          email: 'ijaniusat@gmail.com',
          password: 'mamudu4R,'
        })
        .end((err, res) => {
          expect(res.status).to.equal(409)
          expect(res.body.message).to.equal('User Already Exists')
        })
    })

    // Test Sign up - user created
    it('should return Sign Up Successful', () => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Usman',
          lastName: 'Tijani',
          email: 'teejayusa@gmail.com',
          password: 'Somep@ssw4ordd'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.message).to.equal('Sign Up Successful')
        })
    })
  })
})
