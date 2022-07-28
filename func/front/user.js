//数据库相关
const User = require('../../db/model/userinfos')
const Cart = require('../../db/model/cart')
const MyCourse = require('../../db/model/mycourse')
    //加密
const bcrypt = require('bcryptjs')

//导入token相关插件
const jsonWebToken = require('jsonwebtoken')
const { secertKey } = require('../../schema/config')

// 注册用户的处理函数
exports.register = async(req, res) => {
    let { name, pwd, checkpwd, email } = req.body
    if (pwd != checkpwd) {
        return res.cc("两次密码输入不相同")
    }
    //判断用户名或者email是否已存在
    try {
        let item = await User.find({
            "$or": [{ "nickName": name }, { email }]
        })
        if (item.length > 0) {

            if (item.length === 2) {
                return res.cc("用户名或邮箱已存在")
            }
            if (item[0].nickName === name && item[0].email === email) {
                return res.cc("账号注册过")
            }
            if (item[0].nickName === name) {
                return res.cc("用户名已存在")
            }
            if (item[0].email === email) {
                return res.cc("邮箱已经注册过")
            }
        }
        //bcrypt加密密码
        pwd = bcrypt.hashSync(pwd, 10)
            //插入数据
        item = await User.create({
                "nickName": name,
                email,
                pwd,
            })
            //初始化用户购物车
        await Cart.create({
                "uid": item._id,
                "goodsList1": [],
                "goodsList2": [],
            })
            //初始化用户收藏夹
        await MyCourse.create({
            "uid": item._id,
            "courseList1": [],
            "courseList2": [],
        })
        res.cc("注册用户成功", 0)
    } catch (err) {
        return res.cc(err)
    }


}

// 用户登录处理函数
exports.login = async(req, res) => {
    let { email, pwd } = req.body
        //查看数据库中是否有该用户
    try {
        let item = await User.findOne({
            email
        })
        if (!item) {
            return res.cc('用户不存在')
        }
        //将数据库中密码和用户输入密码比较，这里涉及到了解密
        const result = bcrypt.compareSync(pwd, item.pwd)
        if (!result) {
            return res.cc('密码错误')
        }
        let token = jsonWebToken.sign({ id: item.id, nickName: item.nickName, email },
            secertKey, { expiresIn: '12h' })
        res.send({
            status: 0,
            message: "登录成功",
            token: 'Bearer ' + token,
        })
    } catch (err) {
        return res.cc(err)
    }

}

// 重置密码的处理函数
exports.repwd = async(req, res) => {
    let { pwd, checkpwd, email } = req.body
    if (pwd != checkpwd) {
        return res.cc("两次密码输入不相同")
    }
    //email是否存在
    try {
        let item = await User.find({
            email
        })
        if (item.length === 0) {
            return res.cc('用户不存在')
        }
        if (item.length > 0) {
            //bcrypt加密密码
            pwd = bcrypt.hashSync(pwd, 10)
                //插入数据
            item = await User.updateOne({
                email
            }, { $set: { pwd } })

            res.cc("密码更新成功", 0)
        } else {
            res.cc("邮箱未注册", 0)
        }

    } catch (err) {
        return res.cc(err)
    }


}