let mongoose = require('mongoose')
let liveSchema = new mongoose.Schema({
    courseType: String,
    tid: { type: mongoose.Types.ObjectId, ref: 'Teacherinfo' },
    title: String,
    decoration: String,
    pic: String,
    publishUrl: String,
    playUrl: String,
    price: Number,
    level: Number,
    buy_n: {
        type: Number,
        default: 0
    },
    sc_n: {
        type: Number,
        default: 0
    },
    startTime: Date,
    onLive: { type: Number, default: 1 }
})
let Live = mongoose.model('live', liveSchema)
module.exports = Live