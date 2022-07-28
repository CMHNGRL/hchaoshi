const express = require('express')
const router = express.Router()
    //导入消息模块的相关函数
const message = require('../../func/front/message')


// 获取回复
router.post('/getMsg', message.getMsg)

//删除回复
router.post('/deleteMsg', message.deleteMsg)

module.exports = router