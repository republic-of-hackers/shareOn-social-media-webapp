const route = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Get '/'
route.get('/',(req,res)=>{
    console.log("GET REQUEST '/signup' SIGNUP PAGE")
    return res.render('signup',{
        title:'Signup!'
    })
})

// POST '/'
route.post('/',(req,res,next)=>{
    console.log("POST REQUEST '/signup' SIGNUP USER CALL")
    let userData = {
        username: req.body.username,
        email: req.body.email,
    }
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store hash in your password DB.
        userData.password = hash
        User.create(userData,(err,user)=>{
            if(err) return next(err)
            console.log("REDIRECT '/login' LOGIN PAGE")
            return res.redirect('/login')
        })
    })
})

module.exports = route