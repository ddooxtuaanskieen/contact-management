const express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
let mongoose = require('mongoose')

let loginRoute = require('./routes/login.route')
let contactRoute = require('./routes/contact.route')
let loginMiddleware = require('./middlewares/login.middleware')

dotenv.config()
const app = express()
const port = 2308
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'pug')
app.set('views', 'views')
app.use(express.static('public'))
let connectFunc = async function () {
  await mongoose.connect('mongodb://localhost/ContactManagement', {
    useNewUrlParser: true, useUnifiedTopology: true
  })
}

try {
  connectFunc()
  console.log('Connected to Database')
} catch (error) {
  console.log(error)
}

app.use('/', loginRoute)

app.use('/contacts', loginMiddleware, contactRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})