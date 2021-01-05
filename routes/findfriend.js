const route = require('express').Router()
const User = require('../models/user')

route.get('/', (req, res, next)=>{
    logged_in_user = req.user
    if(logged_in_user){
        current_user_id = logged_in_user._id
        User.find({}, (err, users)=>{
            if(err) return next(err)
            for(let i=0; i<users.length; i++){
                user_id = users[i]._id
                if(JSON.stringify(current_user_id) === JSON.stringify(user_id)){
                    users.splice(i, 1)
                    break
                }
            }
            res.render('findfriend', {
                page_title: "Find Friends",
                friends: users,
                current_user: logged_in_user
            })
        })
    } else {
        res.redirect('/login')
    }

})

route.put('/follow/:id', (req, res, next)=>{
    console.log("PUT REQUEST CALLED -> TO FOLLOW A FRIEND")
    logged_in_user = req.user
    friend_id = req.params.id
    if(logged_in_user){
        User.findById(logged_in_user._id, (err, user)=>{
            if(err) return next(err)
            if(user.following.indexOf(friend_id) === -1){
                user.following.push(friend_id)
            }
            user.save()
        })

        User.findById(friend_id, (err, user)=>{
            if(err) return next(err)
            if(user.followers.indexOf(logged_in_user._id) == -1){
                user.followers.push(logged_in_user._id)
            }
            user.save()
        })

        res.redirect('/findfriend')
    } else {
        res.redirect('/login')
    }
})

route.put('/unfollow/:id', (req, res, next)=>{
    logged_in_user = req.user
    friend_id = req.params.id
    if(logged_in_user){
        User.findById(logged_in_user._id, (err, user)=>{
            if(err) return next(err)
            user.following.splice(user.following.indexOf(friend_id), 1)
            user.save()
        })
        User.findById(friend_id, (err, user)=>{
            if(err) return next(err)
            user.followers.splice(user.followers.indexOf(logged_in_user._id), 1)
            user.save()
        })
        res.redirect('/findfriend')
    } else {
        res.redirect('/login')
    }
})

module.exports = route