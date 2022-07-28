const express = require('express')
const router = express.Router()

//邮箱
const nodemailer = require('nodemailer')

//邮箱验证码
router.post('/yzm', (req, res) => {
    //生成验证码
    let total = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    let code = ''
    for (let i = 0; i < 6; i++) {
        let j = total[Math.floor(Math.random() * 10)]
        code += j
    }
    try {
        //建立一个smtp连接
        let transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            secureConnection: true,
            port: 465,
            auth: {
                user: '2274462859@qq.com',
                pass: 'tpbtgjcjimtydhhd'
            }
        })
        let emil = '2274462859@qq.com,' + req.body.email
            //配置相关参数
        let options = {
            from: '2274462859@qq.com',
            to: emil,
            subject: '欢迎你',
            html: `<div style='width:600px;margin:30px auto'>
                <h1 style='text-align:center'>欢迎注册培优课堂系统账号</h1>
                <p style='font-size:24px'>验证码为：</p>
                <strong style='font-size:20px;display:block;text-align:center;color:red'>${code}</strong>
                <p>验证码有效期 15 分钟</p>
                <p>此为系统操作，请忽略</p>
                </div>`
        }
        transporter.sendMail(options, (err, msg) => {
            if (err) {
                res.cc(err)
            } else {
                res.send({
                        status: 0,
                        msg
                    })
                    //关闭连接
                transporter.close()
            }
        })
        res.send({
            status: 0,
            message: { email: req.body.email, code }
        })
    } catch (e) {
        res.cc(e)
    }


})

module.exports = router