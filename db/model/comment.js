const mongoose = require('mongoose')
let commentSchema = new mongoose.Schema({
    cid: { type: mongoose.Types.ObjectId, index: true, require },
    uid: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
    content: String,
    date: Number,
    reply: [{
        from: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
        to: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
        content: String,
        date: Number
    }]
})
let Comment = mongoose.model('comment', commentSchema)
module.exports = Comment