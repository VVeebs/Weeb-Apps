const route = require('express').Router()
const MangaController = require('../controller/MangaController')

route.get('/', MangaController.read) // nampilin semua manga
route.get('/:genre', MangaController.genre) // nampilin berdasarkan genre
route.get('/:rating', MangaController.rating) // nampilin berdasarkan rating
route.get('/:status', MangaController.status) // nampilin status (complete / incomplete)

module.exports = route