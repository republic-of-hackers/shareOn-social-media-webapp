const route = require('express').Router()

route.get('/', (req, res, next)=>{
    console.log("GET REQUEST AT '/' WELCOME PAGE")
    logged_in_user = req.user
    if(logged_in_user){
        res.render('welcome', {
            page_title: "Welcome Page",
            username: logged_in_user.username
        })
    } else {
        console.log("LOGIN FAILURE REDIRECT '/login' LOGIN PAGE")
        res.redirect("/login")
    }
})

module.exports = route