function errorHandling(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeValidationError':
      return res.status(400).json({ msg: err.msg })

    case 'JsonWebTokenError':
      return res.status(401).json({ msg: "Token invalid" })

    default:
      return res.status(err.status).json({ msg: err.msg })
  }
}

module.exports = errorHandling