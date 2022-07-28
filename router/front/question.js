const express = require('express')
const router = express.Router()


//导入课程分类模块的相关函数
const question = require('../../func/front/question')

//修改用户信息
router.post('/getQuestion', question.getQuestion)

module.exports = router