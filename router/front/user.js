const express = require('express')
const router = express.Router()


//导入用户模块的相关函数
const user = require('../../func/front/user')

//注册新用户
router.post('/register', user.register)

//登录
router.post('/login', user.login)

//找回密码
router.post("/repwd", user.repwd)

module.exports = router