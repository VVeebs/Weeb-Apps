const router = require('express').Router()
const ControllerAnime = require('./controllerAnime')

router.get('/', (req, res) => res.send('Hello World!'))

router.get('/anime', ControllerAnime.showAll)
router.get('/anime/top', ControllerAnime.top) ///ganti si by rating
router.get('/anime/1/:genre', ControllerAnime.genre)
router.get('/anime/:year/:season', ControllerAnime.byYear)

module.exports = router
