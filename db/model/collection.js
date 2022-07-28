const mongoose = require('mongoose')
let collectionSchema = new mongoose.Schema({
    uid: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
    courseList1: [{
        cid: { type: mongoose.Types.ObjectId, ref: 'courseInfo' },
    }],
    courseList2: [{
        cid: { type: mongoose.Types.ObjectId, ref: 'live' },
    }]
})
let Collection = mongoose.model('collection', collectionSchema)
module.exports = Collection