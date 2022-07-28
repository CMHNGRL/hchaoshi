const express = require('express')
const router = express.Router()


//导入直播模块的相关函数
const question = require('../../func/teacher/question')

//登录
router.post('/addQuestion', question.addQuestion)

router.post('/getAllQuestion', question.getAllQuestion)

router.post('/deleteQuestion', question.deleteQuestion)


router.post('/editQuestion', question.editQuestion)

module.exports = router