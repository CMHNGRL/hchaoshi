var mongoose = require('mongoose');
const Comment = require('../../db/model/comment')
const Message = require('../../db/model/message')
exports.send = async(req, res) => {
        let { cid, uid, content } = req.body
        cid = mongoose.Types.ObjectId(cid);
        uid = mongoose.Types.ObjectId(uid);
        await Comment.insertMany({ cid, uid, content, date: Date.now() })
        return res.cc('发表成功', 0)
    }
    //通过id获取对应的评论回复
async function findPage(_id, page) {
    let cid = mongoose.Types.ObjectId(_id);
    let commentCount = await Comment.countDocuments({ cid })
    let comment = await Comment.find({ cid }).sort('-date').limit(5).skip((page - 1) * 5)
        .populate('uid', ['nickName', 'user_pic'])
        .populate('reply.from', ['nickName', 'user_pic'])
        .populate('reply.to', ['nickName', 'user_pic'])
    return { comment, commentCount }
}

//获取评论
exports.page = async(req, res) => {
    let { _id, page } = req.query
    let data = await findPage(_id, page)
    return res.cc(data, 0)
}

//删除评论

exports.delete = async(req, res) => {
    let { _id, reply, cid, page } = req.body
    let comment
        //回复
    if (reply) {
        comment = await Comment.findById(_id)
        comment.reply = comment.reply.filter(value => {
            return value._id + '' !== reply
        })
        comment.save()
    }
    //评论
    else {
        await Comment.findByIdAndDelete(_id)
    }
    let data = await findPage(cid, page)
    return res.cc(data, 0)
}

//回复

exports.reply = async(req, res) => {
    let { _id, from, to, content, cid, page, heSay } = req.body
    let comment = {}
    let date = Date.now()
    comment = await Comment.findById(_id)
    if (comment != '') {
        comment.reply.push({ from, to, content, date })
        comment.save()
    }
    console.log(heSay)
    await Message.insertMany({ comment: _id, you: to, youSay: heSay, user: from, content, date })
    let data = null
        //有则返回分页
    if (cid) data = await findPage(cid, page)
    return res.cc(['回复成功', data], 0)
}