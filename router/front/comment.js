const express = require('express')
const router = express.Router()
    //导入章节模块的相关函数
const comment = require('../../func/front/comment')
    //发送评论
router.post('/send', comment.send)

// 获取评论
router.get('/page', comment.page)

//删除评论
router.post('/delete', comment.delete)


//回复
router.post('/reply', comment.reply)
module.exports = router