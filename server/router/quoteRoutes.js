const route = require('express').Router()
const QuoteController = require('../controller/QuoteController')

route.get('/', QuoteController.readOne)

module.exports = route