//数据库相关
const User = require('../../db/model/teacherinfos')

//加密
const bcrypt = require('bcryptjs')

//导入token相关插件
const jsonWebToken = require('jsonwebtoken')
const { secertKey } = require('../../schema/config')

// 用户登录处理函数
exports.login = async(req, res) => {
    let { email, password } = req.body
        //查看数据库中是否有该用户
    try {
        let item = await User.findOne({
            email
        })

        if (!item) {
            return res.cc('用户不存在')
        }
        //将数据库中密码和用户输入密码比较，这里涉及到了解密
        const result = bcrypt.compareSync(password, item.pwd)
        if (!result) {
            return res.cc('密码错误')
        }
        let token = jsonWebToken.sign({ id: item.id, name: item.name, email }, secertKey, { expiresIn: '12h' })
        res.send({
            status: 0,
            message: "登录成功",
            token: 'Bearer ' + token,
        })
    } catch (err) {
        return res.cc(err)
    }

}