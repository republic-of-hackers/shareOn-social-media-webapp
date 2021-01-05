const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy

const User = require('./models/user')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy(
    function(USERNAME,PASSWORD,done){
        //console.log("Inside local strategy")
        User.findOne({username: USERNAME},(err,user)=>{
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if(!bcrypt.compare(PASSWORD, user.password)) { return done(null, false); }
            return done(null, user);
        })
    }
))

passport.use(new TwitterStrategy({
    consumerKey: '',
    consumerSecret: '',
    callbackURL: "http://localhost:4444/login/twitter/callback"
  },
  async function(token, tokenSecret, profile, cb) {
    let user = await User.findOne({
        twitterID: profile.id
    })
    if(user) return cb(null, user)
    user = await User.create({
        twitterID: profile.id,
        username: profile.displayName
    })
    return cb(null, user)
  }
));

passport.use(new FacebookStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: "http://localhost:4444/login/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    let user = await User.findOne({
        fbID: profile.id
    })
    if(user) return cb(null, user)
    user = await User.create({
        fbID: profile.id,
        username: profile.displayName,
        emai: 'test@email.com'
    })
    return cb(null, user)
  }
));



// Convert user to user.id
passport.serializeUser((user,cb)=>{
    cb(null,user.id)
})

// deserialize
passport.deserializeUser((id,cb)=>{
    User.findOne({_id:id},(err,user)=>{
        if(err) return cb(err)
        return cb(null,user)
    })
})

module.exports = passport