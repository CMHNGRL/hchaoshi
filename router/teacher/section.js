const express = require('express')
const router = express.Router()


//导入直播模块的相关函数
const course = require('../../func/teacher/section')
    //登录
router.post('/addSection', course.addSection)

//获取直播课程
router.post('/getSection', course.getSection)

module.exports = router