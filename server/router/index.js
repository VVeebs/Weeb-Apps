const route = require('express').Router()
const users = require('./userRoutes')
const quote = require('./quoteRoutes')

route.use('/users', users)
route.use('/quote', quote)

module.exports = route