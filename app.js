const express = require('express')
const path = require('path')
const app = express()

require('./db/connect')
require('./server/nms')
    // 接收post参数
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//定义一个响应数据的中间件  提示 如果在错误中间件中没有定义该错误，一定要在token插件前定义该中间件
app.use((req, res, next) => {
    //status:0成功 status:1失败
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//课程分类
app.use(express.static('./upload/coursetype'))
app.use(express.static('./upload/course'))
app.use(express.static('./upload/avatar'))
app.use(express.static('./upload/video'))
const jwt = require('express-jwt')
const { secertKey } = require('./schema/config')
app.use(jwt({
    secret: secertKey,
    algorithms: ['HS256'],
    credentialsRequired: true // false 就不进行校验，游客也可以访问
}).unless({ path: [/^\/api\//] }))


//cors跨域资源
//设置跨域头，这里设置全部允许跨域了
const cors = require('cors')
app.use(cors())


//邮箱验证码生成
const yzm = require('./router/public/yzm')
app.use('/api', yzm)

//图形验证码
const tyzm = require('./router/public/tyzm')
app.use('/api', tyzm)

//导入用户注册登录模块
const user = require('./router/front/user')
app.use('/api', user)

//导入教师注册登录模块
const teacher = require('./router/teacher/user')
app.use('/api/teacher', teacher)

//用户信息相关模块
const userInfo = require('./router/front/userInfo')
app.use(userInfo)

//教师信息相关模块
const teacherInfo = require('./router/teacher/teacherInfo')
app.use('/teacher', teacherInfo)

//上传资源模块 图像，视频，封面
const upload = require('./router/public/upload')
app.use(upload)

//课程信息
const course = require('./router/front/course')
app.use('/api', course)
    //前台直播课程信息
const liveCourse = require('./router/front/live')
app.use('/api', liveCourse)

//直播课程
const live = require('./router/teacher/live')
app.use('/live', live)

//课程
const tcourse = require('./router/teacher/course')
app.use('/course', tcourse)

const tsection = require('./router/teacher/section')
app.use('/section', tsection)

const tquestion = require('./router/teacher/question')
app.use('/question', tquestion)

//弹幕信息
const danmu = require('./router/front/danmu')
app.use('/danmu', danmu)

//评论信息
const comment = require('./router/front/comment')
app.use('/comment', comment)
    //章节信息
const sections = require('./router/front/section')
app.use(sections)
    //获取问题
const question = require('./router/front/question')
app.use(question)

//购物车
const cart = require('./router/front/cart')
app.use('/cart', cart)

//结算
const pay = require('./router/front/pay')
app.use('/pay', pay)

//我的消息
const message = require('./router/front/message')
app.use('/message', message)

//我的课程
const mycourse = require('./router/front/mycourse')
app.use('/mycourse', mycourse)

//管理员
const admin = require('./func/admin')
app.use('/api', admin)

app.use((err, req, res, next) => {
    //身份验证失败
    if (err.name == 'UnauthorizedError') {
        return res.cc('身份认证失败')
    }
    //未知错误
    res.cc(err)
})

app.listen(3001, () => {
    console.log("an express webserve is running")
})