const express = require('express')
const router = express.Router()

//导入课程分类模块的相关函数
const userInfo = require('../../func/teacher/userInfo')

//获取用户信息
router.post('/getUserInfo', userInfo.getUserInfo)


module.exports = router