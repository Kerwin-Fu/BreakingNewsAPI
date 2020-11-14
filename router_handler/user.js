/*
 * @Author: your name
 * @Date: 2020-11-12 16:32:16
 * @LastEditTime: 2020-11-14 10:31:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \BreakingNewsAPI\router_handler\user.js
 */
const bcrypt = require('bcryptjs')

//注册功能
const reguser = (req, res) => {
    const userInfo = req.body
    if(!userInfo.username || !userInfo.password) {
        return res.cc(err)
    }
    //检测用户名是否被占用
    //导入数据库
    const db = require('../db/index')
    const sql = `select * from ev_users where username=?`
    //查询数据库，用户名是否可用
    db.query(sql,userInfo.username,(err,results)=>{
        if(err) return res.cc(err)

        if(results.length >0) {
            return res.cc(err)
        }
        //给密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //将创建的用户信息添加到数据库
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
              return res.cc(err)
            }
            // 注册成功
            res.cc(err,0)
          })
    })
}


//登录功能
const login = (req, res) => {
    res.send('login OK')
}