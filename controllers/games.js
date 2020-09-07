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
    gamesModel
      .create({
        title: req.body.title,
        genres: req.body.genres,
        year: req.body.year,
        price: req.body.price,
        like: req.body.likes,
        description: req.body.description
      })
      .then((newGame) => {
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

  static getGamesByLikes(req, res) {
    if (req.query.likes) {
      const likes = parseInt(req.query.likes)
      gamesModel
        .findAll({
          where: {
            likes: {
              [Op.eq]: likes
            }
          }
        })
        .then((games) => {
          res.status(200).send({ games })
        })
    }
    if (req.query.likes_greater_than) {
      const likes = parseInt(req.query.likes_greater_than)
      gamesModel
        .findAll({
          where: {
            likes: {
              [Op.gt]: likes
            }
          }
        })
        .then((games) => {
          res.status(200).send({ games })
        })
    }
    if (req.query.likes_less_than) {
      const likes = parseInt(req.query.likes_less_than)
      gamesModel
        .findAll({
          where: {
            likes: {
              [Op.lt]: likes
            }
          }
        })
        .then((games) => {
          res.status(200).send({ games })
        })
    }
  }

  static getGamesByTitle(req, res) {
    gamesModel
      .findAll({
        where: {
          title: {
            [Op.substring]: `%${req.query.title}%`
          }
        }
      })
      .then((games) => {
        res.status(200).send({ data: games })
      })
  }

  static getGamesBygenres(req, res) {
    gamesModel
      .findAll({
        where: {
          genres: {
            [Op.substring]: `%${req.query.genres}%`
          }
        }
      })
      .then((games) => {
        res.status(200).send({ data: games })
      })
  }

  static getGamesByYear(req, res) {
    if (req.query.year) {
      const year = parseInt(req.query.year)
      gamesModel
        .findAll({
          where: {
            year: {
              [Op.eq]: year
            }
          }
        })
        .then((games) => {
          res.status(200).send({ games })
        })
    }
    if (req.query.year_greater_than) {
      const year = parseInt(req.query.year_greater_than)
      gamesModel
        .findAll({
          where: {
            year: {
              [Op.gt]: year
            }
          }
        })
        .then((games) => {
          res.status(200).send({ games })
        })
    }
    if (req.query.year_less_than) {
      const year = parseInt(req.query.year_less_than)
      gamesModel
        .findAll({
          where: {
            year: {
              [Op.lt]: year
            }
          }
        })
        .then((games) => {
          res.status(200).send({ games })
        })
    }
  }

  static deleteGames(req, res) {
    gamesModel.findByPk(req.params.id).then((games) => {
      if (!games) {
        return res.status(404).send({
          message: 'Games not found'
        })
      }
      return games.destroy().then(() => {
        return res.status(204).send({
          message: 'Games deleted successfully'
        })
      })
    })
  }
}

export default Games
