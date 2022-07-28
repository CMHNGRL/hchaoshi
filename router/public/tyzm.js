const express = require('express')
const router = express.Router()

//导入图像验证码模块
const svgCaptcha = require('svg-captcha')
    //邮箱验证码
router.get('/tyzm', (req, res) => {
    //生成验证码
    var codeConfig = {
        size: 5, //长度
        ignoreChar: '0o1i', //验证码排除
        noise: 2, //干扰线条数
        height: 36,
        background: "#cc9966"
    }
    var captcha = svgCaptcha.create(codeConfig)
    res.send({
            img: captcha.data,
            txt: captcha.text
        }

    )

})

module.exports = router