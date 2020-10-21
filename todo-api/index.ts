const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = 3023

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = require('./routes/routes.ts')(app, fs)
const server = app.listen(port, () => {
    console.log(`Todo Api is listening on port ${port}!`)
})