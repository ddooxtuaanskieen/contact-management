let mongoose = require('mongoose')

let contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    avatar: String,
    userID: String
})
module.exports = mongoose.model('Contact', contactSchema)

