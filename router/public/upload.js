const express = require('express')
const multer = require('multer')
const router = express.Router()
let fileName, imgName, videoName, avatarName

//课程视频储存位置
const videoStorage = multer.diskStorage({
    //指定路径
    destination: function(req, file, cb) {
        cb(null, './upload/video')
    },
    //指定名字
    filename: function(req, file, cb) {
        let random = Date.now() + parseInt(Math.random() * 999 + '')

        let last = file.originalname.split('.')[1]
        videoName = random + '.' + last
        cb(null, videoName)
    }
})

//课程封面储存位置
const courseStorage = multer.diskStorage({
    //指定路径
    destination: function(req, file, cb) {
        cb(null, './upload/course')
    },
    //指定名字
    filename: function(req, file, cb) {
        let random = Date.now() + parseInt(Math.random() * 999 + '')

        let last = file.originalname.split('.')[1]
        imgName = random + '.' + last
        cb(null, imgName)
    }
})


//用户头像储存位置
const avatarStorage = multer.diskStorage({
    //指定路径
    destination: function(req, file, cb) {
        cb(null, './upload/avatar')
    },
    //指定名字
    filename: function(req, file, cb) {
        let random = Date.now() + parseInt(Math.random() * 999 + '')
        let last = file.originalname.split('/').pop()
        console.log(file)
        avatarName = random + '.' + last
        cb(null, avatarName)
    }
})


//视频
const video = multer({ storage: videoStorage })

//头像
const avatar = multer({ storage: avatarStorage })

//封面
const course = multer({ storage: courseStorage })


// //上传视频
router.post('/uploadVideo', video.single('video'), async(req, res) => {
        const file = req.file
        res.send(file)
    })
    //头像
router.post('/uploadImg', avatar.single('img'), async(req, res) => {
    const file = req.file
    res.send(file)
})

router.post('/uploadImage', course.single('img'), async(req, res) => {
    const file = req.file
    res.send(file)
})

router.post('/api/upload', course.single('img'), async(req, res) => {
    const file = req.file
    res.send(file)
})
module.exports = router