const { User } = require('../models')

async function author(req, res, next) {
  let { id } = req.params
  try {
    const data = await User.findByPk(id)
    if (!data) next(err)
    else if (data.user_id === req.data.id) next()
    else {
      next(err)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = author