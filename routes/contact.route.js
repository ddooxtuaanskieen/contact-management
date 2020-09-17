const express = require('express')
const app = express()
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var urlencodedParser = bodyParser.urlencoded({ extended: true })
let multer = require('multer')

let upload = multer({ dest: 'public/images/contacts' })

let contactController = require('../controllers/contact.controller')
let contactValidation = require('../middlewares/contact/validation.middleware')

let router = express.Router()
router.get('/', contactController.Index)
router.get('/detail/:contactID', contactController.Detail)
router.get('/create', contactController.CreateGet)
router.post('/create', contactValidation, upload.single('avatar'), contactController.CreatePost)
router.get('/update/:contactID', contactController.UpdateGet)
router.post('/update/:contactID', contactController.UpdatePost)
router.get('/delete/:contactID', contactController.Delete)

module.exports = router