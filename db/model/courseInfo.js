// 课程分类数据库模型
const mongoose = require('mongoose')

const couresInfoSchema = new mongoose.Schema({
    //
    // 课程名
    name: {
        type: String
    },
    // 封面
    pic: {
        type: String
    },
    //课程描述
    decoration: {
        type: String
    },
    //老师的id
    tid: { type: mongoose.Types.ObjectId, ref: 'Teacherinfo' },
    // 属于什么分类课程
    cname: { type: String },
    //价格
    price: { type: Number },
    //课程难度1,2,3
    level: { type: Number },
    //创建时间
    addTime: {
        type: Date,
        default: Date.now
    },
    //更新时间
    updateTime: {
        type: Date,
        default: Date.now
    },
    //购买数
    buy_n: {
        type: Number,
        default: 0
    },
    //收藏数
    sc_n: {
        type: Number,
        default: 0
    },
})

const CouresInfo = mongoose.model('couresInfo', couresInfoSchema)
module.exports = CouresInfo