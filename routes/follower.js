const route = require('express').Router()
const User = require('../models/user')

route.get('/', (req, res, next)=>{
    logged_in_user = req.user
    if(logged_in_user){
        //{'user_id': { $in: user.following } }
        User.find({'_id' : { $in : logged_in_user.followers}}, (err, followers_user)=>{
            User.find({'_id': { $in : logged_in_user.following}}, (err, following_user)=>{
                res.render('follower', {
                    page_title: 'Follower Page',
                    followers: followers_user,
                    followings: following_user,
                    current_user: logged_in_user,
                })
            })
        })
        
    } else {
        res.redirect('/login')
    }
})

module.exports = route