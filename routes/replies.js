const route = require('express').Router()
const Reply = require('../models/reply')

route.get('/:id', (req, res, next)=>{
    console.log("GET REQUEST '/replies' REPLY DATA FETCHING")
    logged_in_user = req.user
    if(logged_in_user){
        Reply.findById(req.params.id, (err, reply)=>{
            if(err) return next(err)
            res.send(reply.content)
        })
    } else {
        console.log("LOGIN FAILURE REDIRECT '/login' LOGIN PAGE")
        res.redirect('/login')
    }
})

module.exports = route