const express = require('express')
const router = express.Router()


//导入用户模块的相关函数
const user = require('../../func/teacher/user')

//登录
router.post('/login', user.login)

module.exports = router