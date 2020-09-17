let userModel = require('../models/user.model')
let contactModel = require('../models/contact.model')
let jwt = require('jsonwebtoken')

let Index = async function (req, res) {
    try {
        let decode = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET_KEY)
        let user = await userModel.findOne({ _id: decode.userID }).exec()
        let allContacts = await contactModel.find({ userID: decode.userID }).exec()
        let keyword = req.query.keyword
        let contacts = keyword ?
            allContacts.filter(x => {
                let values = []
                if (x.name) values.push(x.name)
                if (x.phone || x.phone === 0) values.push(x.phone.toString())
                let check = false
                console.log(values)
                for (let value of values) {
                    if (value.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                        check = true
                        break
                    }
                }
                return check
            })
            :
            allContacts
        res.render('contact/index', {
            username: user.username,
            contacts: contacts
        })
    }
    catch (error) {
        // res.redirect('/')
        console.log(error)
    }

}
let Detail = async function (req, res) {
    try {
        let contactID = req.params.contactID
        let contact = await contactModel.findById(contactID)
        res.render('contact/detail', { contact: contact })
    } catch (error) {
        console.log(error)
    }
}
let CreateGet = function (req, res) {
    res.render('contact/create')
}
let CreatePost = async function (req, res) {
    let decode = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET_KEY)
    let user = await userModel.findOne({ _id: decode.userID }).exec()
    let defaultPath = 'images/contacts/default.jpg'
    let newContact = {
        name: req.body.name,
        phone: req.body.phone,
        avatar: req.file ? req.file.path.split('\\').slice(1).join('/') : defaultPath,
        userID: user._id
    }
    await contactModel.create(newContact, function (err, newContact) {
        if (err) return console.log(err);
    });
    console.log(req.body)
    res.redirect('/contacts')
}
let UpdateGet = async function (req, res) {
    try {
        let contactID = req.params.contactID
        let contact = await contactModel.findById(contactID)
        res.render('contact/update', { contact: contact })
    } catch (error) {
        console.log(error)
    }
}
let UpdatePost = async function (req, res) {
    try {
        let contactID = req.params.contactID
        let contact = await contactModel.findById(contactID)
        contact.name = req.body.name
        contact.phone = req.body.phone
        await contact.save()
        res.redirect('/contacts')
    } catch (error) {
        console.log(error)
    }
}
let Delete = async function (req, res) {
    try {
        let contactID = req.params.contactID
        let contact = await contactModel.findById(contactID)
        await contactModel.deleteOne(contact)
        res.redirect('/contacts')
    } catch (error) {
        console.log(error)
    }
}

module.exports.Index = Index
module.exports.Detail = Detail
module.exports.CreateGet = CreateGet
module.exports.CreatePost = CreatePost
module.exports.UpdateGet = UpdateGet
module.exports.UpdatePost = UpdatePost
module.exports.Delete = Delete