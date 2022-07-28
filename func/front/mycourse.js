var mongoose = require('mongoose');
//数据库相关
const Course = require('../../db/model/courseInfo')
const Live = require('../../db/model/live')
const MyCourse = require('../../db/model/mycourse')


exports.getMyCourse = async(req, res) => {
    let { _id, type, query } = req.body
    _id = mongoose.Types.ObjectId(_id);
    let obj = []
    let course
    let q
    let length
    let range = query.pageSize * (query.pageNum - 1)
    let num = query.pageSize
    try {

        course = await MyCourse.findOne({ uid: _id })
        if (type == 1) {
            length = course.courseList1.length
            for (let i = range; i < length && num > 0; i++) {
                q = await Course.findById({ _id: course.courseList1[i].cid })
                q = JSON.parse(JSON.stringify(q))
                obj.push(q)
                num--
            }
            res.cc({ obj, length }, 0)
        } else {
            length = course.courseList2.length
            for (let i = range; i < length && num > 0; i++) {
                q = await Live.findById({ _id: course.courseList2[i].cid })
                q = JSON.parse(JSON.stringify(q))
                obj.push(q)
                num--
            }
            res.cc({ obj, length }, 0)
        }
    } catch (err) {
        return res.cc(err)
    }
}

exports.isInMyCourse = async(req, res) => {
    let { _id, courseId, type } = req.body
    _id = mongoose.Types.ObjectId(_id);

    try {
        if (type == 1) {
            let result = await MyCourse.findOne({ uid: _id })
            let a = result.courseList1.some(item => {
                return courseId == item.cid
            })
            res.cc(a, 0)
        } else {
            let result = await MyCourse.findOne({ uid: _id })
            let a = result.courseList2.some(item => {
                return courseId == item.cid
            })
            res.cc(a, 0)
        }

    } catch (err) {
        return res.cc(err)
    }
}