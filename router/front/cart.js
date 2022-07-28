const express = require('express')
const router = express.Router()


//导入课程分类模块的相关函数
const cart = require('../../func/front/cart')

//添加购物车
router.post('/addShopCar', cart.addShopCar)
    //获取购物车信息
router.post('/getShopCar', cart.getShopCar)
    //删除
router.post('/deleteShopCar', cart.deleteShopCar)

//删除已买课程，添加到我的课程
router.post('/delCarsAndAddCor', cart.delCarsAndAddCor)

module.exports = router