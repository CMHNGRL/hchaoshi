const mongoose = require('mongoose')
let cartSchema = new mongoose.Schema({
    uid: { type: mongoose.Types.ObjectId, ref: 'userinfo' },
    goodsList1: [{
        cid: { type: mongoose.Types.ObjectId, ref: 'courseInfo' },
    }],
    goodsList2: [{
        cid: { type: mongoose.Types.ObjectId, ref: 'live' },
    }]
})
let Cart = mongoose.model('cart', cartSchema)
module.exports = Cart