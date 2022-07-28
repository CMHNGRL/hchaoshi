// 课程章节数据库模型
const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    // 标题
    title: {
        type: String
    },
    //属于课程id
    cid: { type: mongoose.Types.ObjectId, ref: 'couresInfo' },
    //第几章
    section_num: {
        type: Number,
    },
    decoration: {
        type: String
    },
    video: {
        type: String
    },
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
})

const Section = mongoose.model('section', sectionSchema)
module.exports = Section