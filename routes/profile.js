const route = require('express').Router()

route.get("/", (req, res)=>{
    console.log("GET REQUEST '/profile' USER PROFILE PAGE")
    logged_in_user = req.user
    if(logged_in_user){
        res.render('profile', {
            page_title: 'My Profile',
            current_user: logged_in_user,
        })
    } else {
        console.log("LOGIN FAILURE REDIRECT '/login' LOGIN PAGE")
        res.render('login', {
            page_title: "Login Page"
        })
    }
})

module.exports = route