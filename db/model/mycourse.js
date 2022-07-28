const mongoose = require('mongoose')
let mycourseSchema = new mongoose.Schema({
    uid: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
    courseList1: [{
        cid: { type: mongoose.Types.ObjectId, ref: 'courseInfo' },
    }],
    courseList2: [{
        cid: { type: mongoose.Types.ObjectId, ref: 'live' },
    }]
})
let MyCourse = mongoose.model('mycourse', mycourseSchema)
module.exports = MyCourse