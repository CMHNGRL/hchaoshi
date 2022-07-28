//数据库相关
const Section = require('../../db/model/section')
const fs = require('fs')
    // 添加课程
exports.addSection = async(req, res) => {
    let {
        cid,
        title,
        video,
        decoration,
    } = req.body

    try {
        let section_num = await Section.countDocuments({ cid })
        section_num = section_num + 1
        await Section.create({
            cid,
            video,
            title,
            decoration,
            section_num
        })
        res.cc("创建成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}

//获取信息
exports.getSection = async(req, res) => {
    let { _id } = req.body
    try {

        let result = await Section.find({ cid: _id }).sort('-section_num')
        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
}

//删除直播课程
// exports.deleteCourse = async(req, res) => {
//     let { _id } = req.body
//     try {

//         let reslut = await Course.findOneAndDelete({ _id })
//         fs.unlinkSync('upload/course/' + reslut.pic)
//         res.cc("删除成功", 0)
//     } catch (err) {
//         return res.cc(err)
//     }
// }

//编辑

// exports.editCourse = async(req, res) => {
//     let { _id, name, decoration, price, level, cname } = req.body
//     try {

//         let result = await Course.findOneAndUpdate({ _id }, { name, decoration, price, level, cname })
//         res.cc("更新成功", 0)
//     } catch (err) {
//         return res.cc(err)
//     }
// }