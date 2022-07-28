const express = require('express')
const router = express.Router()
    //导入消息模块的相关函数
const mycourse = require('../../func/front/mycourse')


// 获取回复
router.post('/getMyCourse', mycourse.getMyCourse)

router.post('/isInMyCourse', mycourse.isInMyCourse)

module.exports = router