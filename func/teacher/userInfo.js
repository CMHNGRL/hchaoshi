//数据库相关
var mongoose = require('mongoose');
const User = require('../../db/model/teacherinfos')
const Course = require('../../db/model/courseInfo')
const Live = require('../../db/model/live')
const Question = require('../../db/model/question')
const bcrypt = require('bcryptjs')
    // 获取信息
exports.getUserInfo = async(req, res) => {
    let { email } = req.body
    try {
        let item = await User.find({ email })
        let _id = mongoose.Types.ObjectId(item[0]._id)
        let num1 = await Course.countDocuments({ tid: _id })
        let num2 = await Live.countDocuments({ tid: _id })
        let num3 = await Question.countDocuments({ tid: _id })
        res.cc([item[0], num1, num2, num3], 0)

    } catch (err) {
        return res.cc(err)
    }
}