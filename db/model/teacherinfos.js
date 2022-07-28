// 用户数据库模型
const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    // 名称
    name: { type: String, default: "" },
    // 密码
    pwd: {
        type: String,
        require: true
    },
    // 邮箱
    email: {
        type: String,
        unique: true
    },
    // 头像URL
    user_pic: {
        type: String,
        default: ""
    },
})

const Teacherinfo = mongoose.model('Teacherinfo', teacherSchema)
module.exports = Teacherinfo