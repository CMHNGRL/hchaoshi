const express = require('express')
const router = express.Router()
    //导入章节模块的相关函数
const danmu = require('../../func/front/danmu')

router.get('/', danmu.read)
router.post('/', danmu.send)
module.exports = router