// 课程分类数据库模型
const mongoose = require('mongoose')

const courestypeSchema = new mongoose.Schema({
    // 课程名
    name: {
        type: String
    },
    // 图像
    pic: {
        type: String
    },
    decoration: {
        type: String
    },
})

const Courestype = mongoose.model('courestype', courestypeSchema)
module.exports = Courestype