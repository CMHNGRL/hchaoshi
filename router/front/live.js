const express = require('express')
const router = express.Router()

//导入课程模块的相关函数
const live = require('../../func/front/live')

//首页展示最新的课程信息
router.get('/queryList', live.getQueryList)

router.post('/getLiveDetailInfo', live.getLiveDetailInfo)

//直播课程中心获取课程信息
router.post('/liveSearch', live.getLiveSearch)

module.exports = router