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
  }
  
  export default Games