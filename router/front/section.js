const express = require('express')
const router = express.Router()


//导入章节模块的相关函数
const section = require('../../func/front/section')


//根据课程id获取，章节列表。根据章节id获取章节信息
router.post('/sectionList', section.getSectionList)

module.exports = router