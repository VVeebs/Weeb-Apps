const route = require('express').Router()
const UserController = require('../controller/UserController')

route.post('/login', UserController.login)
route.post('/register', UserController.register)
route.put('/:id', UserController.update)

route.get('/:id/manga', UserController.manga) // nampilin list manga favorite
route.post('/:id/manga/:manga_id', UserController.addManga) // nambahin manga ke list favorite
route.delete('/:id/manga/:manga_id', UserController.deleteManga) // hapus manga dari list favorite

route.get('/:id/anime', UserController.anime) // nampilin list anime favorite
route.post('/:id/anime/:anime_id', UserController.addAnime) // nambahin anime ke list favorite
route.delete('/:id/anime/:anime_id', UserController.deleteAnime) // hapus anime dari list favorite

module.exports = route
