let jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
    if (!req.cookies.jwttoken) {
        res.redirect('/')
        return
    }
    try {
        let decode = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET_KEY)
        next()
    } catch (error) {
        console.log(error.message)
        res.redirect('/')
        return
    }
}