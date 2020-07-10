const {OAuth2Client} = require('google-auth-library');
const { FavManga, Manga, User } = require('../models')
const { compare } = require('bcrypt')
const { createToken } = require("../helper/jwt");
const axios = require('axios');
const jwt = require('../helper/jwt');

class UserController {
  static async read(req, res, next) {
    try {
      const data = await User.findAll();
      let data2 = {
        id: data.id,
        name: data.name

      }
      res.status(200).json({ data2 });
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    let { password, email } = req.body
    try {
      const data = await User.findOne({
        where: {
          email
        }
      })
      if (data) {
        if (compare(password, data.password)) {
          const token = createToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({ msg: `${data.name} logged in successfully`, token })
        } else throw ({ status: 400, msg: "Wrong email/password" })
      } else throw ({ status: 404, msg: "User not found" })
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    let { name, password, email } = req.body
    try {
      const data = await User.findOne({
        where: {
          email
        }
      })
      if (data) throw ({ status: 400, msg: "Email is already in use" })
      else {
        const data2 = await User.create({
          name,
          password,
          email
        })
        res.status(201).json({ msg: `User ${name} registered successfully` })
      }
    } catch (err) {
      next(err)
    }
  }

  static async edit(req, res, next) {
    let { id } = req.params
    let { name, password, email } = req.body;
    try {
      const data = await User.findByPk(id);
      if (!data) throw ({ status: 400, msg: "User not found" })
      else {
        let newUser = {
          name,
          password,
          email
        }
        const data2 = await User.update(newUser, {
          where: {
            id,
          },
        });
        res.status(200).json({ msg: "User data updated successfully" });
      }
    } catch (err) {
      next(err)
    }
  }

  static async favmanga(req, res, next) {
    let { id } = req.params
    try {
      const data = await FavManga.findAll({
        where: {
          user_id: id
        }
      })
      if (!data) throw ({ status: 401, msg: "User had not favorited any manga" })
      else {
        const data2 = await Manga.findAll({
          include: {
            model: FavManga,
            where: {
              user_id: id
            }
          },
        })
        res.status(200).json({ data2 })
      }
    } catch (err) {
      next(err)
    }
  }

  static manga(req, res, next) {
    let { title } = req.params
    axios({
      method: 'GET',
      url: `https://kitsu.io/api/edge/manga?filter[text]=${title}`,

    }).then(obj => {
      if (obj) {

        let arr = obj.data.data
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
          newArr[i] = {}
          newArr[i].image = arr[i].attributes.posterImage.medium
          newArr[i].title = arr[i].attributes.titles.en_jp
          newArr[i].rating = +arr[i].attributes.averageRating
          newArr[i].status = arr[i].attributes.status
          newArr[i].volume = arr[i].attributes.volumeCount

          if (newArr[i].rating === null) {
            newArr[i].rating = "not rated"
          }

          if (newArr[i].status === 'current') {
            newArr[i].status = "ongoing"
          }

          if (newArr[i].volume === null) {
            newArr[i].volume = "tbd"
          }
        }
        req.session.data = newArr[0]
        res.status(200).json(newArr[0])
      } else throw ({ status: 400, msg: "Manga not found" })
    }).catch(err => next(err))
  }

  static async addManga(req, res, next) {
    let { id } = req.params
    let { image, title, rating, status, volume } = req.session.data
    try {
      const data = await Manga.findOne({
        where: {
          title
        }
      })
      if (data) throw ({ status: 400, msg: "You've already favorited this manga" })
      else {
        const data2 = await Manga.create({
          image,
          title,
          rating,
          status,
          volume
        })

        const data3 = await FavManga.create({
          user_id: id,
          manga_id: data2.id
        })
        res.status(201).json({ msg: "Manga added successfully" })
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteManga(req, res, next) {
    let { id, manga_id } = req.params
    try {
      const data = await Manga.destroy({
        where: {
          id: manga_id
        }
      })

      const data2 = await FavManga.destroy({
        where: {
          user_id: id,
          manga_id
        }
      })
      res.status(201).json({ msg: "Manga removed successfully" })
    } catch (err) {
      next(err)
    }
  }

  static googleLogin(req, res, next){

    const { id_token } = req.body;

        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID 
        const client = new OAuth2Client(CLIENT_ID);

        let nameUser = null
        let emailUser = null
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID
        })
            .then(ticket =>{
                console.log( {ticket: ticket.getPayload()} )
                let { name, email } = ticket.getPayload()
                nameUser = name
                emailUser = email
                return User.findOne({where: {email}})
            })
            .then(foundUser =>{
              if (foundUser){
                return foundUser
              }else{
                let password = Math.round(Math.random()*1000) + 'akuanimemanga';
                let name = nameUser
                let email = emailUser
                return User.create({name, email, password})
              }
            })
            .then(user =>{
              let token = createToken({
                id: user.id,
                email: user.email
              })

              console.log('berhasil login di server')
              res.status(201).json({ msg: `${user.name} logged in successfully`, token })
            })
            .catch(error=>{
                next(error)
            })

  }
}

module.exports = UserController