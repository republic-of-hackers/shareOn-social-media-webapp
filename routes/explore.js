const route = require('express').Router()
const Post = require('../models/post')

route.get('/', (req, res, next)=>{
    logged_in_user = req.user
    if(logged_in_user){
        Post.find({}, (err, posts)=>{
            if(err) return next(err)
            posts.reverse()
            res.render('explore', {
                page_title: "Explore Page",
                all_posts: posts,
                username: logged_in_user.username,
                current_user_id: logged_in_user._id
            })
        })
    } else {
        res.redirect('/login')
    }
})

module.exports = route