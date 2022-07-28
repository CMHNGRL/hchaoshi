const express = require('express')
const router = express.Router()


//导入课程分类模块的相关函数
const pay = require('../../func/front/pay')

//结算
router.post('/checkout', pay.checkout)

//支付
router.post('/alipay', pay.alipay)

router.post('/statePay', pay.statePay)

module.exports = router