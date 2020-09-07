import express from 'express'

import Games from '../controllers/games'

const router = express.Router()

/* GET home page. */
router.get('/games', Games.getAllGames)
router.get('/game/:id', Games.getSingleGames)
router.post('/games', Games.addGames)

module.exports = router
