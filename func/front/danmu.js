const Danmu = require('../../db/model/danmu')

// 获取弹幕
exports.read = async(req, res) => {
        let sid = req.query
        let danmu = await Danmu.findOne(sid)
        if (!danmu) {
            return res.cc('没有弹幕')
        }
        let danmuList = danmu.danmuList
            //封装弹幕数据
        let data = danmuList.map(item => [item.time, item.type,
            item.color, item.uid, item.text
        ])
        res.cc(data, 0)
    }
    // 发送弹幕
exports.send = async(req, res) => {
    let body = req.body
    let danmu = await Danmu.findOne({ sid: body.sid })
    if (body.type === 'right') body.type = 0
    if (body.type === 'top') body.type = 1
    if (body.type === 'bottom') body.type = 2
    if (!danmu) {
        danmu = new Danmu({ sid: body.sid })
    }
    delete body.player
    danmu.danmuList.push(body)
    await danmu.save()
    res.cc('发送成功', 0)
}