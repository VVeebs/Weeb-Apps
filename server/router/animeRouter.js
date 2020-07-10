const router = require('express').Router()
const ControllerAnime = require('../controller/controllerAnime')

router.get('/', (req, res) => res.send('Hello World!'))

router.get('/:title', ControllerAnime.findAnime)
router.get('/top', ControllerAnime.top) ///ganti si by rating
router.get('/genre/:genre', ControllerAnime.genre)
router.get('/:year/:season', ControllerAnime.byYear)

module.exports = router
