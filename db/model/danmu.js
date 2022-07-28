const mongoose = require('mongoose')
let danmuSchema = new mongoose.Schema({
    //章节视频的id
    sid: { type: mongoose.Types.ObjectId, required: true, index: true },
    danmuList: [{
        //用户id
        uid: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
        time: Number,
        text: String,
        color: String,
        type: { type: Number },
        date: Number
    }]
})
let Danmu = mongoose.model('danmu', danmuSchema)
module.exports = Danmu