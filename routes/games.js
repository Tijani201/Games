import express from 'express'

import Games from '../controllers/games'

const router = express.Router()

/* GET home page. */
router.get('/games', Games.getAllGames)

module.exports = router
