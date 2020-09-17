let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String
})
module.exports = mongoose.model('User', userSchema)

