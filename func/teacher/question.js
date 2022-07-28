//数据库相关
const Question = require('../../db/model/question')
const fs = require('fs')
    // 添加课程
exports.addQuestion = async(req, res) => {
    let {
        tid,
        cname,
        question,
        type, //0选择，1判断
        difficult,
        incorrect_answers1,
        incorrect_answers2,
        incorrect_answers3,
        correct_answer,
        jiexi
    } = req.body
    let incorrect_answers = []
    if (type == 1) {
        incorrect_answers = [!correct_answer]
    } else {
        incorrect_answers = [incorrect_answers1, incorrect_answers2, incorrect_answers3]
    }
    try {
        await Question.create({
            tid,
            cname,
            question,
            type, //0选择，1判断
            difficult,
            incorrect_answers,
            correct_answer,
            jiexi
        })
        res.cc("创建成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}
exports.getAllQuestion = async(req, res) => {
    let {
        _id,
    } = req.body
    try {
        let result = await Question.find({ tid: _id })
        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
}

exports.deleteQuestion = async(req, res) => {
    let { _id } = req.body
    try {

        await Question.findOneAndDelete({ _id })
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}

exports.editQuestion = async(req, res) => {
    let {
        _id,
        cname,
        question,
        type, //0选择，1判断
        difficulty,
        incorrect_answers,
        correct_answer,
        jiexi
    } = req.body
    if (type == 1) {
        incorrect_answers = [!correct_answer]
    }
    try {

        await Question.findByIdAndUpdate({ _id }, { cname, question, incorrect_answers, correct_answer, jiexi, difficulty })
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
}