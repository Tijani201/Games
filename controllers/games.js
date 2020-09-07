import { Op } from 'sequelize'
import models from '../models/index'

const gamesModel = models.Games

class Games {
    static welcome(req, res) {
      res.status(200).send({ message: 'Welcome to Games Api' })
    }

    static getAllGames(req, res) {
        gamesModel.findAll().then((games) => {
          res.status(200).send({ message: 'Games fetched successfully', games })
        })
      }

      static getSingleGames(req, res) {
        const id = parseInt(req.params.id)
        gamesModel
          .findOne({
            where: {
              id
            }
          })
          .then((games) => {
            if (!games) {
              return res.status(404).send({
                message: 'games not found'
              })
            }
            return res
              .status(200)
              .send({ message: `Single games found ${id} sucessfully`, games })
          })
      }

      static addGames(req, res) {
        gamesModel.create({
          title: req.body.title,
          genres: req.body.genres,
          year: req.body.year,
          price: req.body.price,
          like: req.body.likes,
          description: req.body.description
        }).then((newGame) => {
          return res
            .status(201)
            .send({ message: 'Game added successfully', data: newGame })
        })
      }

      static updateGames(req, res) {
        const id = parseInt(req.params.id)
        gamesModel.findByPk(id).then((games) => {
          if (!games) {
            return res.status(404).send({ message: 'Games not found' })
          }
          return games
            .update({
              title: req.body.title || games.title,
              genres: req.body.genres || games.genre,
              rating: games.rating,
              likes: games.likes,
              year: req.body.year || games.year,
              price: req.body.price || games.price,
              description: req.body.description || games.description
            })
            .then((updatedGames) => {
              return res
                .status(200)
                .send({ message: 'Games updated successfully', data: updatedGames })
            })
        })	  
      }	

      static getGamesByRating(req, res) {
        if (req.query.rating) {
          const rating = parseInt(req.query.rating)
          gamesModel
            .findAll({
              where: {
                rating: {
                  [Op.eq]: rating
                }
              }
            })
            .then((games) => {
              res.status(200).send({ games })
            })
        }
        if (req.query.rating_greater_than) {
          const rating = parseInt(req.query.rating_greater_than)
          gamesModel
            .findAll({
              where: {
                rating: {
                  [Op.gt]: rating
                }
              }
            })
            .then((games) => {
              res.status(200).send({ games })
            })
        }
        if (req.query.rating_less_than) {
          const likes = parseInt(req.query.rating_less_than)
          gamesModel
            .findAll({
              where: {
                rating: {
                  [Op.lt]: rating
                }
              }
            })
            .then((games) => {
              res.status(200).send({ games })
            })
        }
      }
  }
  
  export default Games