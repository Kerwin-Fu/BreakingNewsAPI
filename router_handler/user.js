const bcrypt = require('bcryptjs')

//注册功能
const reguser = (req, res) => {
    const userInfo = req.body
    if(!userInfo.username || !userInfo.password) {
        return res.send({
            status: 1,
            message:'用户名或密码不能为空'
        })
    }
    //检测用户名是否被占用
    //导入数据库
    const db = require('../db/index')
    const sql = `select * from ev_users where username=?`
    //查询数据库，用户名是否可用
    db.query(sql,userInfo.username,(err,results)=>{
        if(err) return res.send({
            status: 1,
            message: err.message
        })

        if(results.length >0) {
            return res.send({
                status: 1,
                message: '用户名被占用，请更换其他用户名'
            })
        }
        //给密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //将创建的用户信息添加到数据库
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
              return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            }
            // 注册成功
            res.send({ status: 0, message: '注册成功！' })
          })
    })
}


//登录功能
const login = (req, res) => {
    res.send('login OK')
}