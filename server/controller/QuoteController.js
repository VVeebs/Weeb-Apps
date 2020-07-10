const axios = require('axios')

class QuoteController {
  static readOne(req, res, next) {
    axios({
      method: 'GET',
      url: `https://anime-chan.herokuapp.com/api/quotes/random`,

    }).then(obj => {
      res.status(200).json(obj.data[0])
    }).catch(err => next(err))
  }
}

module.exports = QuoteController