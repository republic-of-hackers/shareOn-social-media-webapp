const route = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')

route.get('/', (req,res, next)=>{
    logged_in_user = req.user
    if(logged_in_user){
        User.findById(logged_in_user._id, (err, user)=>{
            if(err) return next(err)
            Post.find({'user_id': { $in: user.following } }, (err, posts)=>{
                if(err) return next(err)
                res.render('home', {
                    page_title: "Home Page",
                    all_posts: posts,
                    username: logged_in_user.username,
                    current_user_id: logged_in_user._id
                })
            })
        })    
    } else {
        res.redirect('/login')
    }
})

module.exports = route