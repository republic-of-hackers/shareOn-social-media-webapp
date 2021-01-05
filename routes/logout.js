const route = require('express').Router()

route.get('/', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = route