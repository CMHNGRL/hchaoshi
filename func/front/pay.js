var mongoose = require('mongoose');
//支付宝沙箱相关
const alipaySdk = require('../../schema/alipay')
const AlipayFormData = require('alipay-sdk/lib/form').default

//数据库相关
const Course = require('../../db/model/courseInfo')
const Live = require('../../db/model/live')

const axios = require('axios')

//获取支付信息
exports.checkout = async(req, res) => {
    let { setArr } = req.body
    let data = { data: [], price: 0 }
    let q
    try {
        for (let i = 0; i < setArr.length; i++) {
            if (setArr[i].type == 1) {
                q = await Course.findById({ _id: setArr[i].id })
                q = JSON.parse(JSON.stringify(q))
                q['type'] = 1
            } else {
                q = await Live.findById({ _id: setArr[i].id })
                q = JSON.parse(JSON.stringify(q))
                q['type'] = 2
            }
            data.data.push(q)
            data.price += q.price
        }
        res.cc(data, 0)
    } catch (err) {
        return res.cc(err)
    }
}

//支付实现
exports.alipay = async(req, res) => {
    let { orderId, price, name } = req.body

    //对接支付宝api
    const formData = new AlipayFormData();
    //调用setMethod并传入get ,返回跳转支付宝页面的url
    formData.setMethod('get')
        //支付信息
    formData.addField('bizContent', {
            outTradeNo: orderId, //订单号
            productCode: 'FAST_INSTANT_TRADE_PAY',
            totalAmount: price,
            subject: name
        })
        //支付成功或者失败跳转连接
    formData.addField('returnUrl', 'http://localhost:8080/payment')
        //返回promise
    const result = await alipaySdk.exec(
            'alipay.trade.page.pay', {}, { formData },
        )
        //对接支付宝成功，支付宝返回数据
    res.cc(result, 0)
}


//判断支付状态
exports.statePay = async(req, res) => {
    let {
        out_trade_no,
        trade_no
    } = req.body
    console.log(out_trade_no, trade_no)
    const formData = new AlipayFormData();
    //调用setMethod并传入get ,返回跳转支付宝页面的url
    formData.setMethod('get')
        //支付信息
    formData.addField('bizContent', {
            out_trade_no,
            trade_no
        })
        //返回promise
    const result = await alipaySdk.exec(
        'alipay.trade.query', {}, { formData },
    )
    axios({
        method: 'GET',
        url: result
    }).then(ret => {
        let resCode = ret.data.alipay_trade_query_response
        if (resCode.code == '10000') {
            switch (resCode.trade_status) {
                case 'WAIT_BUYER_PAY':
                    res.cc('支付宝有交易记录，没付款')
                    break;

                case 'TRADE_CLOSED':
                    res.cc('交易关闭')
                    break;

                case 'TRADE_FINISHED':
                    res.cc('交易完成', 0)
                    break;

                case 'TRADE_SUCCESS':
                    res.cc('交易完成', 0)
                    break;
            }
        } else {
            res.cc('交易不存在')
        }
    }).catch(err => {
        res.cc('交易失败')
    })

}