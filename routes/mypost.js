const route = require('express').Router()
const Post = require('../models/post')

route.get('/', (req, res, next)=>{
    logged_in_user = req.user
    if(logged_in_user){
        Post.find({'user_id': logged_in_user._id}, (err, posts)=>{
            if(err) return next(err)
            res.render('mypost', {
                page_title: "My Post",
                all_posts: posts,
                current_user: logged_in_user,
                current_user_id: logged_in_user._id
            })
        })
    } else {
        res.redirect('/login')
    }
})

module.exports = route