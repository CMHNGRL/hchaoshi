// 用户数据库模型
const mongoose = require('mongoose')

const userinfoSchema = new mongoose.Schema({
    //昵称
    nickName: { type: String, maxlength: 14, unique: true },
    // 姓名
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
    // 性别
    sex: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: ""
    },
    birthday: {
        type: Date,
        default: ""
    },
    // 头像URL
    user_pic: {
        type: String,
        default: ""
    },
    //签名
    sign: {
        type: String,
        maxlength: 40,
        default: ""
    },
    //电话
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
})

const Userinfo = mongoose.model('userinfo', userinfoSchema)

module.exports = Userinfo