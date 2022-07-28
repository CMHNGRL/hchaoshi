var mongoose = require('mongoose');
//数据库相关

const Live = require('../../db/model/live')


//首页
exports.getQueryList = async(req, res) => {
    //获取信息
    try {
        let item = await Live.find().sort({ 'startTime': -1 }).limit(8)

        res.cc(item, 0)
    } catch (err) {
        return res.cc(err)
    }
}

exports.getLiveDetailInfo = async(req, res) => {
    let { id } = req.body
    try {
        let item = await Live.findById(id).populate('tid', ['name', 'user_pic'])

        res.cc(item, 0)
    } catch (err) {
        return res.cc(err)
    }
}

//课程中心
exports.getLiveSearch = async(req, res) => {
    let { pageNum, pageSize, entity } = req.body
    pageSize = Number(pageSize)
    pageNum = Number(pageNum)
    let total = ""
    let item = ""

    //定义一变量来排序
    let obj = {}
    try {
        //按课程分类，难度，排序方法

        if (entity.courseName == '') {
            if (entity.category != '') {
                if (entity.courseLevel != 0) {
                    //有课程分类，有课程难度
                    total = await Live.find({ courseType: entity.category, level: entity.courseLevel }).countDocuments()
                    if (entity.sortBy == 'price-asc') {
                        item = await Live.find({ courseType: entity.category, level: entity.courseLevel }).sort({ price: -1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else if (entity.sortBy == 'price-desc') {
                        item = await Live.find({ courseType: entity.category, level: entity.courseLevel }).sort({ price: 1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else {
                        obj[entity.sortBy] = -1
                        item = await Live.find({ courseType: entity.category, level: entity.courseLevel }).sort(obj).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    }
                } else {
                    //有课程分类，无课程难度
                    total = await Live.find({ courseType: entity.category }).countDocuments()
                    if (entity.sortBy == 'price-asc') {
                        item = await Live.find({ courseType: entity.category }).sort({ price: -1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else if (entity.sortBy == 'price-desc') {
                        item = await Live.find({ courseType: entity.category }).sort({ price: 1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else {
                        obj[entity.sortBy] = -1
                        item = await Live.find({ courseType: entity.category }).sort(obj).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    }
                }
            } else {
                if (entity.courseLevel != 0) {
                    //无课程分类，有课程难度
                    total = await Live.find({ level: entity.courseLevel }).countDocuments()
                    if (entity.sortBy == 'price-asc') {
                        item = await Live.find({ level: entity.courseLevel }).sort({ price: -1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else if (entity.sortBy == 'price-desc') {
                        item = await Live.find({ level: entity.courseLevel }).sort({ price: 1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else {
                        obj[entity.sortBy] = -1
                        item = await Live.find({ level: entity.courseLevel }).sort(obj).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    }
                } else {
                    //无课程分类，无课程难度
                    total = await Live.find().countDocuments()
                    if (entity.sortBy == 'price-asc') {
                        item = await Live.find().sort({ price: -1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else if (entity.sortBy == 'price-desc') {
                        item = await Live.find().sort({ price: 1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else {
                        obj[entity.sortBy] = -1
                        item = await Live.find().sort(obj).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    }
                }
            }

            res.cc(item, total)
        } else {
            //按课程名
            const reg = new RegExp(entity.courseName, 'i')
            total = await Live.find({ title: { $regex: reg } }).countDocuments()
            item = await Live.find({ title: { $regex: reg } }).skip(pageSize * (pageNum - 1)).limit(pageSize)
            res.cc(item, total)
        }

    } catch (err) {
        return res.cc(err)
    }
}