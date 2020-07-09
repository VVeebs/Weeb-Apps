const { Sequelize } = require('sequelize')
const { Quote } = require('../models')

class QuoteController {
  static async readOne(req, res, next) {
    try {
      const data = await Quote.findOne({
        order: [
          Sequelize.fn('RANDOM')
        ]
      })
      res.status(200).json({ data })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = QuoteController