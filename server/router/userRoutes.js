const route = require('express').Router()
const UserController = require('../controller/UserController')
const author = require('../middleware/authorization')

route.get('/', UserController.read)
route.post('/login', UserController.login)
route.post('/register', UserController.register)
route.put('/:id', UserController.edit)

route.get('/manga/:title', UserController.manga)
route.get('/:id/favManga', author, UserController.favmanga) // nampilin list manga favorite
route.post('/:id/favManga/', author, UserController.addManga) // nambahin manga ke list favorite
route.delete('/:id/favManga/:manga_id', author, UserController.deleteManga) // hapus manga dari list favorite

// route.get('/:id/anime', UserController.anime) // nampilin list anime favorite
// route.post('/:id/anime/:anime_id', UserController.addAnime) // nambahin anime ke list favorite
// route.delete('/:id/anime/:anime_id', UserController.deleteAnime) // hapus anime dari list favorite

module.exports = route
