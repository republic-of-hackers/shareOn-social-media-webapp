const express = require('express')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const passport = require('./passport')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// mongodb connection
mongoose.connect('mongodb://localhost:27017/shareonapp')
const db = mongoose.connection
db.on('error', (err)=>{
    console.error(err)
})

app.use(session({
    secret:'abc',
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',express.static(path.join(__dirname,'static')))

// hbs configuration
app.set('view engine','hbs')
const hbs = require('hbs')
hbs.registerHelper(
    'ifEquals', function(arg1, arg2, options) {
        return ( JSON.stringify(arg1) === JSON.stringify(arg2) ) ? options.fn(this) : options.inverse(this);
    }
)

app.use('/', require('./routes/welcome'))

app.use('/login',require('./routes/login'))
app.use('/logout', require('./routes/logout'))
app.use('/signup',require('./routes/signup'))

app.use('/profile',require('./routes/profile'))
app.use('/otherprofile', require('./routes/otherprofile'))

app.use('/post', require('./routes/post'))
app.use('/mypost', require('./routes/mypost'))
app.use('/home', require('./routes/home'))
app.use('/explore', require('./routes/explore'))

app.use('/follower', require('./routes/follower'))
app.use('/findfriend', require('./routes/findfriend'))
app.use('/replies', require('./routes/replies'))


// Error handler Middleware - Last middle ware
app.use((err,req,res,next)=>{
    if(err) return next(err)
    return res.render('error',{
        message:err.message,
        page_title:'Error Page'
    })
})

app.listen(4444, ()=>{
    console.log("Started Server at https://localhost:4444")
})