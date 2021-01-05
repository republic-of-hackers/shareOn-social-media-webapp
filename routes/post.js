const route = require('express').Router()
const Post = require('../models/post')
const Reply = require('../models/reply')

// Post Creation
route.post('/create', (req, res, next)=>{
    console.log("POST REQUEST '/post/create' USER CREATE POST")
    logged_in_user = req.user
    if(logged_in_user){
        let postData = {
            user_id: logged_in_user._id,
            author_email: req.body.email,
            name: req.body.name,
            topic: req.body.topic,
            content: req.body.content,
            like: false,
            replies:[],
        }
        Post.create(postData, (err, post)=>{
            if(err) return next(err)
            console.log("REDIRECT '/login' LOGIN PAGE")
            return res.redirect('/profile')
        })

    } else {
        console.log("LOGIN FAILURE REDIRECT '/login' LOGIN PAGE")
        res.redirect('/login')
    }
})

route.get('/create', (req, res)=>{
    console.log("GET REQUEST '/post/create' PAGE CREATE PAGE")
    logged_in_user = req.user
    if(logged_in_user){
        res.render('postcreate', {
            page_title:"Create a Post", 
            current_user: logged_in_user.username
        })
    } else {
        console.log("LOGIN FAILURE REDIRECT '/login' LOGIN PAGE")
        res.redirect('/login')
    }
})

// Post Like and Unlike
route.put('/like/:id', (req, res, next)=>{
    logged_in_user = req.user
    post_id = req.params.id
    if(logged_in_user){
        Post.findById(post_id, (err, post)=>{
            if(err) return next(err)
            if(post.likeby.indexOf(logged_in_user._id) === -1){
                post.likeby.push(logged_in_user._id)
                post.save()
            }
        })

        if(req.body.path === 'home'){
            res.redirect('/post/home')
        } 
        if(req.body.path === 'explore') {
            res.redirect('/post/explore')
        }

        res.redirect('/')

    } else {
        res.redirect('/login')
    }
})

route.put('/unlike/:id', (req, res, next)=>{
    logged_in_user = req.user
    post_id = req.params.id
    if(logged_in_user){
        Post.findById(post_id, (err, post)=>{
            if(err) return next(err)
            if(post.likeby.indexOf(logged_in_user._id) != -1) {
                post.likeby.splice(post.likeby.indexOf(logged_in_user._id), 1)
                post.save()
            }
        })

        if(req.body.path === 'home'){
            res.redirect('/post/home')
        } 
        if(req.body.path === 'explore') {
            res.redirect('/post/explore')
        }

        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})

// Post Reply

route.put('/addreply/:id', (req, res, next)=>{
    logged_in_user = req.user
    post_id = req.params.id
    if(logged_in_user){
        let replyData = {
            'user_id': logged_in_user._id,
            'post_id': post_id,
            'content': req.body.content
        }
        console.log("REPLY is created")
        //console.log(req.body.content)
        Reply.create(replyData, (err, reply)=>{
            if(err) return next(err)
            Post.findById(post_id, (err, post)=>{
                if(err) return next(err)
                if(post.replies.indexOf(reply._id) === -1){
                    post.replies.push(reply._id)
                    post.save()
                }
            })
            if(req.body.path === 'home'){
                return res.redirect('/post/home')
            } 
            if(req.body.path === 'explore') {
                return res.redirect('/post/explore')
            }
            return res.redirect('/')
        })
    } else {
        res.redirect('/login')
    }
})

module.exports = route