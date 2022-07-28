const express = require('express')
const router = express.Router()
    //数据库相关
const Course = require('../db/model/courseInfo')
const Live = require('../db/model/live')
const Question = require('../db/model/question')
const Coursetype = require('../db/model/coursetype')
const Teacher = require('../db/model/teacherinfos')
const User = require('../db/model/userinfos')
const fs = require('fs')

const bcrypt = require('bcryptjs')
    // 获取课程信息
router.post('/gly/getAllCourse', async(req, res) => {
    try {

        let result = await Course.find()
        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
})

router.post('/gly/resetPwd', async(req, res) => {
    let { _id, pwd } = req.body
    try {
        pwd = bcrypt.hashSync(pwd, 10)
        await Teacher.findByIdAndUpdate({ _id }, { pwd })
        res.cc("更新成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

router.post('/gly/resetPwd1', async(req, res) => {
        let { _id, pwd } = req.body
        try {
            pwd = bcrypt.hashSync(pwd, 10)
            await User.findByIdAndUpdate({ _id }, { pwd })
            res.cc("更新成功", 0)
        } catch (err) {
            return res.cc(err)
        }
    })
    //删除课程信息
router.post('/gly/deleteCourse', async(req, res) => {
    let { _id } = req.body
    try {

        let reslut = await Course.findOneAndDelete({ _id })
        fs.unlinkSync('upload/course/' + reslut.pic)
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

//编辑课程信息
router.post('/gly/editCourse', async(req, res) => {
    let { _id, name, decoration, price, level, cname } = req.body
    try {

        let result = await Course.findOneAndUpdate({ _id }, { name, decoration, price, level, cname })
        res.cc("更新成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

//获取课程信息
router.post('/gly/getAllLive', async(req, res) => {
    try {

        let result = await Live.find()
        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
})

//编辑课程信息
router.post('/gly/editLive', async(req, res) => {
    let { _id, onLive, title, decoration, price, level, courseType, startTime } = req.body
    try {

        let live = await Live.findOneAndUpdate({ _id }, { onLive, title, decoration, price, level, courseType, startTime })
        res.cc("更新成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

//删除直播课程
router.post('/gly/deleteLive', async(req, res) => {
    let { _id } = req.body
    try {

        let live = await Live.findOneAndDelete({ _id })
        fs.unlinkSync('upload/course/' + live.pic)
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

//删除试题
router.post('/gly/deleteQuestion', async(req, res) => {

    let { _id } = req.body
    try {

        await Question.findOneAndDelete({ _id })
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

//编辑试题信息
router.post('/gly/editQuestion', async(req, res) => {
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
})

//获取试题
router.post('/gly/getAllQuestion', async(req, res) => {
    try {
        let result = await Question.find()
        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
})

//添加课程分类
router.post('/gly/addCourseType', async(req, res) => {
    let { name, pic, decoration } = req.body
    try {
        await Coursetype.create({ name, pic, decoration })
        res.cc("创建成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

//获取分类信息
router.get('/gly/getAllType', async(req, res) => {
    try {
        let result = await Coursetype.find()

        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
})

//删除课程分类
router.post('/gly/deleteType', async(req, res) => {

    let { _id } = req.body
    try {

        let type = await Coursetype.findOneAndDelete({ _id })
        fs.unlinkSync('upload/course/' + type.pic)
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

//编辑分类
router.post('/gly/editType', async(req, res) => {
    let { _id, name, decoration } = req.body
    try {

        await Coursetype.findOneAndUpdate({ _id }, { name, decoration })
        res.cc("更新成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

//添加教师
router.post('/gly/addTeacher', async(req, res) => {
        let { name, password, email } = req.body
        try {
            let pwd = bcrypt.hashSync(password, 10)
            await Teacher.create({ name, pwd, email, user_pic: "1649867570284.jpeg" })
            res.cc("创建成功", 0)
        } catch (err) {
            return res.cc(err)
        }
    })
    //删除
router.post('/gly/deleteTeacher', async(req, res) => {
    let { _id } = req.body
    try {
        await Teacher.findOneAndDelete({ _id })
        res.cc("删除成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})

router.post('/gly/deleteStudent', async(req, res) => {
        let { _id } = req.body
        try {
            await User.findOneAndDelete({ _id })
            res.cc("删除成功", 0)
        } catch (err) {
            return res.cc(err)
        }
    })
    //编辑
router.post('/gly/editTeacher', async(req, res) => {
    let { _id, name, email } = req.body
    try {

        await Teacher.findOneAndUpdate({ _id }, { name, email })
        res.cc("更新成功", 0)
    } catch (err) {
        return res.cc(err)
    }
})
router.post('/gly/editStudent', async(req, res) => {
        let { _id, name, email } = req.body
        try {

            await User.findOneAndUpdate({ _id }, { name, email })
            res.cc("更新成功", 0)
        } catch (err) {
            return res.cc(err)
        }
    })
    //获取
router.get('/gly/getAllTeacher', async(req, res) => {
    try {
        let result = await Teacher.find()

        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
})
router.get('/gly/getAllStudent', async(req, res) => {
    try {
        let result = await User.find()

        res.cc(result, 0)
    } catch (err) {
        return res.cc(err)
    }
})

module.exports = router