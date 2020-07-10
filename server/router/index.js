const route = require('express').Router()
const users = require('./userRoutes')
const quote = require('./quoteRoutes')
const anime = require('./animeRouter')

route.use('/users', users)
route.use('/quote', quote)
route.use('/anime', anime)

module.exports = route