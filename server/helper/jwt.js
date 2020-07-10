const jwt = require('jsonwebtoken')
const secretkey = process.env.SECRETKEY

function createToken(param) {
  return jwt.sign(param, secretkey)
}

function verifyToken(token) {
  return jwt.verify(token, secretkey)
}

module.exports = { createToken, verifyToken }