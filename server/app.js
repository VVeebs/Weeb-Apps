require('dotenv').config()
const cors = require('cors')
const express = require('express')
const route = require('./router/index')
const session = require('express-session')
const app = express()
const port = 3000

app.use(cors())
app.use(session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: false
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(route)

app.listen(port, () => console.log(`Listening on port ${port}`))
