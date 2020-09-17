const express = require('express')

let loginController = require('../controllers/login.controller')

let router = express.Router()
router.get('/', loginController.loginGet)
router.post('/', loginController.loginPost)
router.get('/register', loginController.registerGet)
router.post('/register', loginController.registerPost)
router.get('/forgot', loginController.forgotGet)
router.post('/forgot', loginController.forgotPost)
router.get('/logout', loginController.logOut)

module.exports = router