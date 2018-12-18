'use strict'
const express = require('express')

//App setup
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

//Static file
app.use(express.static('public'))
