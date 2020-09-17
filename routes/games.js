import express from 'express'

import Games from '../controllers/games'

const router = express.Router()
import validateAddGames from '../middleware/games'

/* GET home page. */
router.get('/games', Games.getAllGames)
router.get('/game/:id', Games.getSingleGames)
router.post('/games', validateAddGames, Games.addGames)
router.put('/games/:id', validateAddGames, Games.updateGames)
router.get('/games/rating', Games.getGamesByRating)
router.get('/games/likes', Games.getGamesByLikes)
router.get('/games/title', Games.getGamesByTitle)
router.get('/games/genres', Games.getGamesBygenres)
router.get('/games/description', Games.getGamesByDescription)
router.get('/games/year', Games.getGamesByYear)
router.delete('/games/:id', Games.deleteGames)

module.exports = router
