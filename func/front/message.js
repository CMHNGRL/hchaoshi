var mongoose = require('mongoose');
const Message = require('../../db/model/message')

//获取回复
exports.getMsg = async(req, res) => {
    let { _id } = req.body
    let data = await Message.find({ you: _id }).sort('-date').populate('comment', ['content', 'cid'])
        .populate('you', ['nickName', 'user_pic']).populate('user', ['nickName', 'user_pic'])
    return res.cc(data, 0)
}

//删除回复
exports.deleteMsg = async(req, res) => {
    let { _id, userId } = req.body
    await Message.findByIdAndDelete(_id)
    let item = await Message.find({ you: userId }).sort('-date').populate('comment', ['content', 'cid'])
        .populate('you', ['nickName', 'user_pic']).populate('user', ['nickName', 'user_pic'])
    res.cc({ data: item, message: "删除成功" }, 0)
}