//数据库相关
const Course = require('../../db/model/courseInfo')
const fs = require('fs')
    // 添加课程
exports.addCourse = async(req, res) => {
    let {
        tid,
        courseType,
        name,
        decoration,
        pic,
        level,
        price,
    } = req.body
    if (level == '初级') {
        level = 1
    } else if (level == '中级') {
        level = 2
    } else {
        level = 3
    }
    try {

        await Course.create({
            tid,
            cname: courseType,
            name,
            decoration,
            pic,
            level,
            price,
        })
        res.cc("创建成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}

// 获取信息
exports.getAllCourse = async(req, res) => {
    let { _id } = req.body
    try {

        let result = await Course.find({ tid: _id })
        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
}

//删除直播课程
exports.deleteCourse = async(req, res) => {
    let { _id } = req.body
    try {

        let reslut = await Course.findOneAndDelete({ _id })
        fs.unlinkSync('upload/course/' + reslut.pic)
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}

//编辑

exports.editCourse = async(req, res) => {
    let { _id, name, decoration, price, level, cname } = req.body
    try {

        let result = await Course.findOneAndUpdate({ _id }, { name, decoration, price, level, cname })
        res.cc("更新成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}