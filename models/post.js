const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
    user_id : {type:Schema.Types.ObjectId},
    author_email: {type:String, required:true},
    name: {type:String, required:true},
    topic: {type:String, required:true},
    content: {type:String, required:true},
    likeby: [{type:Schema.Types.ObjectId}],
    replies:[{type:Schema.Types.ObjectId}],
})

const Post = mongoose.model('Post',PostSchema)
module.exports = Post