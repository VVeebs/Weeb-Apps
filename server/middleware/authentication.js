const verifyToken = require('../helper/jwt')
const { User } = require('../models')
const { decode } = require('jsonwebtoken')

async function authenctic(req, res, next) {
  let { token } = req.headers
  try {
    let decoded = verifyToken(token)
    const targetUser = await User.findOne({
      where: {
        email: decode.email
      }
    })
    if (!targetUser) throw ({ status: 404, msg: "User not found" })
    else {
      req.data = decoded
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authenctic