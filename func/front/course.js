var mongoose = require('mongoose');
//数据库相关
const Coursetype = require('../../db/model/coursetype')
const Course = require('../../db/model/courseInfo')
const Teacher = require('../../db/model/teacherinfos')
    // 获取根据id课程信息
exports.getCourseInfoById = async(req, res) => {
        let { id } = req.body
        id = mongoose.Types.ObjectId(id);
        //获取信息
        try {
            let item = await Course.findOne({ _id: id })
            let teacher = await Teacher.findOne({ '_id': item.tid })
            res.cc({...item._doc, tname: teacher.name }, 0)
        } catch (err) {
            return res.cc(err)
        }
    }
    //首页
exports.getQueryNew = async(req, res) => {
        //获取信息
        try {
            let item = await Course.find().sort({ 'updateTime': -1 }).limit(8)

            res.cc(item, 0)
        } catch (err) {
            return res.cc(err)
        }
    }
    //课程中心
exports.getCourseSearch = async(req, res) => {
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
                    total = await Course.find({ cname: entity.category, level: entity.courseLevel }).countDocuments()
                    if (entity.sortBy == 'price-asc') {
                        item = await Course.find({ cname: entity.category, level: entity.courseLevel }).sort({ price: -1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else if (entity.sortBy == 'price-desc') {
                        item = await Course.find({ cname: entity.category, level: entity.courseLevel }).sort({ price: 1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else {
                        obj[entity.sortBy] = -1
                        item = await Course.find({ cname: entity.category, level: entity.courseLevel }).sort(obj).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    }
                } else {
                    //有课程分类，无课程难度
                    total = await Course.find({ cname: entity.category }).countDocuments()
                    if (entity.sortBy == 'price-asc') {
                        item = await Course.find({ cname: entity.category }).sort({ price: -1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else if (entity.sortBy == 'price-desc') {
                        item = await Course.find({ cname: entity.category }).sort({ price: 1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else {
                        obj[entity.sortBy] = -1
                        item = await Course.find({ cname: entity.category }).sort(obj).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    }
                }
            } else {
                if (entity.courseLevel != 0) {
                    //无课程分类，有课程难度
                    total = await Course.find({ level: entity.courseLevel }).countDocuments()
                    if (entity.sortBy == 'price-asc') {
                        item = await Course.find({ level: entity.courseLevel }).sort({ price: -1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else if (entity.sortBy == 'price-desc') {
                        item = await Course.find({ level: entity.courseLevel }).sort({ price: 1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else {
                        obj[entity.sortBy] = -1
                        item = await Course.find({ level: entity.courseLevel }).sort(obj).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    }
                } else {
                    //无课程分类，无课程难度
                    total = await Course.find().countDocuments()
                    if (entity.sortBy == 'price-asc') {
                        item = await Course.find().sort({ price: -1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else if (entity.sortBy == 'price-desc') {
                        item = await Course.find().sort({ price: 1 }).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    } else {
                        obj[entity.sortBy] = -1
                        item = await Course.find().sort(obj).skip(pageSize * (pageNum - 1)).limit(pageSize)
                    }
                }
            }

            res.cc(item, total)
        } else {
            //按课程名
            const reg = new RegExp(entity.courseName, 'i')
            total = await Course.find({ name: { $regex: reg } }).countDocuments()
            item = await Course.find({ name: { $regex: reg } }).skip(pageSize * (pageNum - 1)).limit(pageSize)
            res.cc(item, total)
        }

    } catch (err) {
        return res.cc(err)
    }
}