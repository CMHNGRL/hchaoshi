const express = require('express')
const router = express.Router()


//导入直播模块的相关函数
const live = require('../../func/teacher/live')

//登录
router.post('/addLive', live.addLive)

//获取直播课程
router.post('/getAllLive', live.getAllLive)

//删除直播课程
router.post('/deleteLive', live.deleteLive)

//编辑直播课程
router.post('/editLive', live.editLive)

module.exports = router