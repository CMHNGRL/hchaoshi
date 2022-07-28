const express = require('express')
const router = express.Router()

//导入课程分类模块的相关函数
const courseType = require('../../func/front/courseType')

//导入课程模块的相关函数
const course = require('../../func/front/course')

//导入章节模块的相关函数
const section = require('../../func/front/section')

//获取课程分类信息
router.get('/courseType', courseType.getCourseTypeInfo)

//首页展示最新的课程信息
router.get('/queryNew', course.getQueryNew)

//根据id获取课程信息
router.post('/courseInfoById', course.getCourseInfoById)

//根据id获取课程信息
router.post('/couresAllSection', section.getCouresAllSection)

//课程中心获取课程信息
router.post('/courseSearch', course.getCourseSearch)

module.exports = router