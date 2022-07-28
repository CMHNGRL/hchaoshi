// 课程分类数据库模型
const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    // 属于什么类型题目
    cname: {
        type: String,
        default: 'python'
    },
    //老师的id
    tid: { type: mongoose.Types.ObjectId, ref: 'Teacherinfo', default: '6257773458267b3274eaafc3' },
    //选择0、判断1
    type: {
        type: Number,
        default: 1
    },
    //0,1,2
    difficulty: {
        type: Number,
        default: 2
    },
    question: {
        type: String
    },
    correct_answer: {
        type: String
    },
    incorrect_answers: {
        type: Array
    },
    jiexi: {
        type: String
    }
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question