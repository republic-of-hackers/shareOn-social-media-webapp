const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    username: {type: String},
    password: {type:String},
    email: {type:String},
    fbID: {type:String},
    twitterID:{type:String},
    posts:[{type:Schema.Types.ObjectId}],
    replies:[{type:Schema.Types.ObjectId}],
    followers:[{type:Schema.Types.ObjectId}],
    following:[{type:Schema.Types.ObjectId}]
})

const User = mongoose.model('User',UserSchema)
module.exports = User