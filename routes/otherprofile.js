const route = require('express').Router()
const User = require('../models/user')
const Post = require('../models/post')

route.get('/:id', (req, res, next)=>{
    required_user_id = req.params.id
    logged_in_user = req.user
    if(logged_in_user){
        User.findById(required_user_id, (err, user)=>{
            if(err) return next(err)
            res.render('otherprofile', {
                page_title: user.username + ' Profile',
                current_user: logged_in_user,
                required_user: user
            })
        })
    } else {
        res.redirect('/login')
    }
})

route.get('/post/:id', (req, res, next)=>{
    required_user_id = req.params.id
    logged_in_user = req.user
    if(logged_in_user){
        User.findById(required_user_id, (err, user)=>{
            if(err) return next(err)
            Post.find({'user_id': required_user_id}, (err, posts)=>{
                if(err) return next(err)
                res.render('otherpost', {
                    page_title: user.username + ' Posts',
                    required_user: user,
                    current_user: logged_in_user,
                    all_posts: posts
                })
            })
        })
    } else {
        res.redirect('/login')
    }
})

route.get('/follow/:id', (req, res, next)=>{
    required_user_id = req.params.id
    logged_in_user = req.user
    if(logged_in_user){
        User.findById(required_user_id, (err, user)=>{
            if(err) return next(err)
            res.render('otherfollow', {
                page_title: user.username + ' Friends List',
                current_user: logged_in_user,
                required_user: user
            })
        })
    } else {
        res.redirect('/login')
    }
})

module.exports = route