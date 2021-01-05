const route = require('express').Router()
const passport = require('passport')

// GET '/'
route.get('/',(req,res)=>{
    if(req.user){
        res.redirect('/profile')
    }
    return res.render('login',{
        page_title:'Login Page'
    })
})

// Post '/'
route.post('/',passport.authenticate('local', { failureRedirect:'/login'}),
    function (req, res) {
        res.redirect('/')
    })

// Get '/facebook'
route.get('/facebook',passport.authenticate('facebook'))

// GET '/facebook/callback
route.get('/facebook/callback',passport.authenticate('facebook',{
    failureRedirect:'/login',
    successRedirect:'/'
}))

// twitter login
route.get('/twitter',
  passport.authenticate('twitter'));

route.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = route