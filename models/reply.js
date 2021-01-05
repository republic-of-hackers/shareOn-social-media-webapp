const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReplySchema = mongoose.Schema({
    user_id : {type:Schema.Types.ObjectId},
    post_id : {type:Schema.Types.ObjectId},
    content : {type:String, required:true}
    
})

const Reply = mongoose.model('Reply',ReplySchema)
module.exports = Reply