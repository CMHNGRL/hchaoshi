let mongoose = require('mongoose')
let messageSchema = new mongoose.Schema({
    comment: { type: mongoose.Types.ObjectId, ref: 'comment' },
    you: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
    youSay: String,
    user: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
    content: String,
    date: Number
})
let Message = mongoose.model('message', messageSchema)
module.exports = Message