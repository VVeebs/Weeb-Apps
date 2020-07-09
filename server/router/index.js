const route = require('express').Router()
const users = require('./userRoutes')
const manga = require('./mangaRoutes')
const quote = require('./quoteRoutes')

route.use('/users', users)
// route.use('/manga', manga)
route.use('/quote', quote)

module.exports = route