//数据库相关
const Section = require('../../db/model/section')
const CouresInfo = require('../../db/model/courseInfo')
var mongoose = require('mongoose');

//根据id获取课程章节信息
exports.getCouresAllSection = async(req, res) => {
    let { id, pageSize, pageNum } = req.body
    id = mongoose.Types.ObjectId(id);
    pageSize = Number(pageSize)
    pageNum = Number(pageNum)
        //获取信息
    try {
        let total = await Section.find({ cid: id }).countDocuments()
        let item = await Section.find({ cid: id }).skip(pageSize * (pageNum - 1)).sort({ "section_num": 1 }).limit(pageSize)
        res.cc(item, total)
    } catch (err) {
        return res.cc(err)
    }
}

//根据课程id获取课程章节信息，根据章节id获取章节信息
exports.getSectionList = async(req, res) => {
    let { courseId } = req.body
    let cid = mongoose.Types.ObjectId(courseId);
    //获取信息
    try {
        let item = await Section.find({ cid }).sort({ "section_num": 1 })
        res.cc(item, 0)
    } catch (err) {
        return res.cc(err)
    }
}