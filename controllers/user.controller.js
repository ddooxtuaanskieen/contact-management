let userModel = require('../models/user.model')

// let Index = async function (req, res) {
//     try {
//         let allContact = await contactModel.find({})
//         res.render('contact/index', { allContact: allContact })
//     }
//     catch (error) {
//         console.log(error)
//     }

// }
// let Detail = async function (req, res) {
//     try {
//         let contactID = req.params.contactID
//         let contact = await contactModel.findById(contactID)
//         res.render('contact/detail', { contact: contact })
//     } catch (error) {
//         console.log(error)
//     }
// }
// let CreateGet = function (req, res) {
//     res.render('contact/create')
// }
// let CreatePost = function (req, res) {
//     let newContact = {
//         name: req.body.name,
//         phone: req.body.phone,
//         avatar: req.file.path.split('\\').slice(1).join('/')
//     }
//     contactModel.create(newContact, function (err, newContact) {
//         if (err) return console.log(err);
//     });
//     res.redirect('/contacts')
// }
// let UpdateGet = async function (req, res) {
//     try {
//         let contactID = req.params.contactID
//         let contact = await contactModel.findById(contactID)
//         res.render('contact/update', { contact: contact })
//     } catch (error) {
//         console.log(error)
//     }
// }
// let UpdatePost = async function (req, res) {
//     try {
//         let contactID = req.params.contactID
//         let contact = await contactModel.findById(contactID)
//         contact.name = req.body.name
//         contact.phone = req.body.phone
//         await contact.save()
//         res.redirect('/contacts')
//     } catch (error) {
//         console.log(error)
//     }
// }
// let Delete = async function (req, res) {
//     try {
//         let contactID = req.params.contactID
//         let contact = await contactModel.findById(contactID)
//         await contactModel.deleteOne(contact)
//         res.redirect('/contacts')
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports.Index = Index
// module.exports.Detail = Detail
// module.exports.CreateGet = CreateGet
// module.exports.CreatePost = CreatePost
// module.exports.UpdateGet = UpdateGet
// module.exports.UpdatePost = UpdatePost
// module.exports.Delete = Delete