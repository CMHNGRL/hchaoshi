//数据库相关
const Live = require('../../db/model/live')
const fs = require('fs')
    // 添加课程
exports.addLive = async(req, res) => {
    let {
        tid,
        courseType,
        name,
        decoration,
        pic,
        level,
        price,
        date,
        num
    } = req.body
    let playUrl = "/live/" + tid + num + ".flv"
    let publishUrl = "rtmp://localhost/live/" + tid + num
    if (level == '初级') {
        level = 1
    } else if (level == '中级') {
        level = 2
    } else {
        level = 3
    }
    try {

        await Live.create({
            tid,
            courseType,
            title: name,
            decoration,
            pic,
            level,
            price,
            startTime: date,
            publishUrl,
            playUrl
        })
        res.cc("创建成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}

// 获取信息
exports.getAllLive = async(req, res) => {
    let { _id } = req.body
    try {

        let result = await Live.find({ tid: _id })
        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
}

//删除直播课程
exports.deleteLive = async(req, res) => {
    let { _id } = req.body
    try {

        let live = await Live.findOneAndDelete({ _id })
        fs.unlinkSync('upload/course/' + live.pic)
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}

//编辑

exports.editLive = async(req, res) => {
    let { _id, onLive, title, decoration, price, level, courseType, startTime } = req.body
    try {

        let live = await Live.findOneAndUpdate({ _id }, { onLive, title, decoration, price, level, courseType, startTime })
        res.cc("更新成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}