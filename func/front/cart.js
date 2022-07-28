var mongoose = require('mongoose');
//数据库相关
const Cart = require('../../db/model/cart')
const Course = require('../../db/model/courseInfo')
const Live = require('../../db/model/live')
const MyCourse = require('../../db/model/mycourse')
    //添加购物车
exports.addShopCar = async(req, res) => {
    let { _id, courseId, type } = req.body
    let goods = []
    try {
        //存在
        goods = await Cart.findOne({ uid: _id })
        if (type == 1) {
            if (goods.goodsList1.some(item => item.cid == courseId)) {

                res.cc("数据已存在", 0)
            } else {
                goods.goodsList1.push({ cid: courseId })
                goods.save()
                res.cc("添加成功", 0)
            }

        } else {
            if (goods.goodsList2.some(item => item.cid == courseId)) {
                res.cc("数据已存在", 0)
            } else {
                goods.goodsList2.push({ cid: courseId })
                goods.save()
                res.cc("添加成功", 0)
            }
        }
    } catch (err) {
        return res.cc(err)
    }
}

//获取购物车信息
exports.getShopCar = async(req, res) => {
    let { _id } = req.body
    let obj = []
    _id = mongoose.Types.ObjectId(_id);
    try {
        let goods = await Cart.findOne({ uid: _id })
        let q
        for (let i = 0; i < goods.goodsList1.length; i++) {
            q = await Course.findById({ _id: goods.goodsList1[i].cid })
            q = JSON.parse(JSON.stringify(q))
            q['type'] = 1
            obj.push(q)
        }
        for (let i = 0; i < goods.goodsList2.length; i++) {
            q = await Live.findById({ _id: goods.goodsList2[i].cid })
            q = JSON.parse(JSON.stringify(q))
            q['type'] = 2
            obj.push(q)
        }
        res.cc(obj, 0)
    } catch (err) {
        return res.cc(err)
    }
}

//删除
exports.deleteShopCar = async(req, res) => {
    let { _id, courseId, type } = req.body
    _id = mongoose.Types.ObjectId(_id);
    courseId = mongoose.Types.ObjectId(courseId);
    try {
        if (type == 1) {
            await Cart.findOneAndUpdate({ uid: _id }, { $pull: { goodsList1: { cid: courseId } } })
            res.cc("删除成功", 0)
        } else {
            await Cart.findOneAndUpdate({ uid: _id }, { $pull: { goodsList2: { cid: courseId } } })
            res.cc("删除成功", 0)
        }
    } catch (err) {
        return res.cc(err)
    }
}


exports.delCarsAndAddCor = async(req, res) => {
    let { _id, course } = req.body
    _id = mongoose.Types.ObjectId(_id);
    try {
        for (let i = 0; i < course.length; i++) {
            if (course[i].type == 1) {
                await Cart.findOneAndUpdate({ uid: _id }, { $pull: { goodsList1: { cid: course[i].id } } })
                await MyCourse.findOneAndUpdate({ uid: _id }, { $push: { courseList1: { cid: course[i].id } } })
            } else {
                await Cart.findOneAndUpdate({ uid: _id }, { $pull: { goodsList2: { cid: course[i].id } } })
                await MyCourse.findOneAndUpdate({ uid: _id }, { $push: { courseList2: { cid: course[i].id } } })

            }
        }
        res.cc('成功', 0)

    } catch (err) {
        return res.cc(err)
    }
}