require('dotenv').config()
const express = require('express')
const route = require('./router/index')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(route)

app.listen(port, () => console.log(`Listening on port ${port}`))