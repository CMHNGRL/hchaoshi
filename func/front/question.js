//数据库相关
const Question = require('../../db/model/question')
    // 获取课程分类信息
exports.getQuestion = async(req, res) => {
    let { number, type, difficulty, category } = req.body
        //获取信息
    number = parseInt(number)
    try {
        let item = await Question.find({ type, difficulty, cname: category }, null, { limit: number })

        res.cc(item, 0)
    } catch (err) {
        return res.cc(err)
    }
}