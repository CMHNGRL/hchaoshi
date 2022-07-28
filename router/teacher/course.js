const express = require('express')
const router = express.Router()


//导入直播模块的相关函数
const course = require('../../func/teacher/course')
    //登录
router.post('/addCourse', course.addCourse)

//获取直播课程
router.post('/getAllCourse', course.getAllCourse)

//删除直播课程
router.post('/deleteCourse', course.deleteCourse)

// //编辑直播课程
router.post('/editCourse', course.editCourse)

module.exports = router