const express = require('express')
const router = express.Router()

//导入课程分类模块的相关函数
const userInfo = require('../../func/front/userInfo')

//获取用户信息
router.post('/getUserInfo', userInfo.getUserInfo)

// //修改用户信息
// router.post('/updateUerInfo', userInfo.updateUerInfo)

//修改密码
router.post('/updatePwd', userInfo.updatePwd)

//修改用户头像
router.post('/updateAvatar', userInfo.updateAvatar)

//修改用户各种信息
router.post('/updateUserInfo', userInfo.updateUserInfo)

module.exports = router