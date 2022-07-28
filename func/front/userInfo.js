//数据库相关
const User = require('../../db/model/userinfos')
const bcrypt = require('bcryptjs')
    // 获取信息
exports.getUserInfo = async(req, res) => {
    let { email } = req.body
    try {
        let item = await User.find({ email })

        res.cc(item[0], 0)

    } catch (err) {
        return res.cc(err)
    }
}

//修改用户信息
exports.updateUerInfo = async(req, res) => {
    let { name, email, sex, phone, sign, user_pic } = req.body
        //判断用户名或者email是否已存在
    try {
        let item = await User.updateOne({ email }, { $set: { name, email, sex, phone, sign, user_pic } })
        item = await User.find({ email })
        res.send(item[0])
    } catch (err) {
        return res.cc(err)
    }
}

//修改密码
exports.updatePwd = async(req, res) => {
    let { password, password_new, name } = req.body
        //判断用户名或者email是否已存在
    try {
        let item = await User.findOne({ nickName: name })
            //将数据库中密码和用户输入密码比较，这里涉及到了解密
        const result = bcrypt.compareSync(password, item.pwd)
        if (result) {
            let pwd = bcrypt.hashSync(password_new, 10)
            item = await User.updateOne({ nickName: name }, { $set: { pwd } })

            res.cc("密码修改成功", 0)

        } else {
            return res.cc("密码修改失败")
        }
    } catch (err) {
        return res.cc(err)
    }
}

//修改头像
exports.updateAvatar = async(req, res) => {
    let { nickName, user_pic } = req.body
        //判断用户名或者user_pic是否已存在
    try {
        await User.updateOne({ nickName }, { $set: { user_pic } })
        res.cc("头像修改成功", 0)

    } catch (err) {
        return res.cc(err)
    }
}

//修改各种信息
exports.updateUserInfo = async(req, res) => {
    let { nickName, name, address, sex, sign, age, birthday, email } = req.body
    try {
        let item = await User.findOne({ nickName })
        if (!item) {
            await User.updateOne({ email }, { $set: { nickName, name, address, sex, sign, age, birthday } })
            res.cc("信息更新成功", 0)
        } else {
            //说明没有该昵称或者昵称已经被别人用了
            await User.updateOne({ email }, { $set: { name, address, sex, sign, age, birthday } })

            if (item.email == email) {
                res.cc("信息更新成功", 0)
            } else {
                res.cc("昵称已被别人用了，其他信息更新成功", 0)
            }
        }

    } catch (err) {
        return res.cc(err)
    }
}