const router = require('express').Router()
const ControllerAnime = require('../controller/controllerAnime')

router.get('/', (req, res) => res.send('Hello World!'))

router.get('/anime/:title', ControllerAnime.findAnime)
router.get('/anime/top', ControllerAnime.top) ///ganti si by rating
router.get('/anime/genre/:genre', ControllerAnime.genre)
router.get('/anime/:year/:season', ControllerAnime.byYear)

module.exports = router
