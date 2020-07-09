const route = require('express').Router()
const QuoteController = require('../controller/QuoteController')

route.get('/random', QuoteController.readOne)

module.exports = route