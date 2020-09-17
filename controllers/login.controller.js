let userModel = require('../models/user.model')

let jwt = require('jsonwebtoken')

let loginGet = function (req, res) {
    try {
        let decode = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET_KEY)
        res.redirect('/contacts')
    } catch (error) {
        res.render('login')
        return
    }
}

let loginPost = async function (req, res) {
    try {
        let loginInfo = {
            username: req.body.username,
            password: req.body.password
        }
        let user = await userModel.findOne(loginInfo).exec()
        if (!user) {
            res.render('login', {
                lastInfo: req.body
            })
            return
        }
        else {
            let user = await userModel.findOne({ username: req.body.username, password: req.body.password }).exec()
            let payload = { userID: user._id }
            let jwttoken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: '24h'
            })
            res.cookie('jwttoken', jwttoken)
            res.redirect('/contacts')
            return
        }
    } catch (error) {
        console.log(error)
    }
}
let registerGet = async function (req, res) {
    res.render('register')
    return
}
let registerPost = async function (req, res) {
    try {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        }
        await userModel.create(newUser)
        res.redirect('/')
        return
    } catch (error) {
        console.log(error)
    }

}
let forgotGet = async function (req, res) {
    res.render('forgot')
    return
}
let forgotPost = async function (req, res) {
    res.render('register')
    return
}
let logOut = async function (req, res) {
    res.clearCookie('jwttoken');
    res.redirect('/')
}
module.exports.loginGet = loginGet
module.exports.loginPost = loginPost
module.exports.registerGet = registerGet
module.exports.registerPost = registerPost
module.exports.forgotGet = forgotGet
module.exports.forgotPost = forgotPost
module.exports.logOut = logOut