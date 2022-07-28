//数据库相关
const Coursetype = require('../../db/model/coursetype')
    // 获取课程分类信息
exports.getCourseTypeInfo = async(req, res) => {
    //获取信息
    try {
        let item = await Coursetype.find()

        res.cc(item, 0)
    } catch (err) {
        return res.cc(err)
    }
}