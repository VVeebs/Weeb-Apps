const route = require('express').Router()
const ControllerAnime = require('../controller/controllerAnime')

route.get('/:title', ControllerAnime.findAnime)
route.get('/top', ControllerAnime.top) ///ganti si by rating
route.get('/genre/:genre', ControllerAnime.genre)
route.get('/:year/:season', ControllerAnime.byYear)

module.exports = route
