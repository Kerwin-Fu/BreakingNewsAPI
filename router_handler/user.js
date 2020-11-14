const bcrypt = require('bcryptjs')
// 导入数据库操作模块
const db = require('../db/index')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')

//注册功能
exports. regUser = (req, res) => {
    const userInfo = req.body
    // if(!userInfo.username || !userInfo.password) {
    //     return res.cc('用户名或密码不能为空')
    // }
    //检测用户名是否被占用
    //导入数据库
    const sql = `select * from ev_users where username=?`
    //查询数据库，用户名是否可用
    db.query(sql,userInfo.username,(err,results)=>{
        if(err) return res.cc(err)

        if(results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名')
        }
        //给密码加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        //将创建的用户信息添加到数据库
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userInfo.username, password: userInfo.password }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err);
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
              return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            res.cc('注册成功',0)
          })
    })
}


//登录功能
exports.login = (req, res) => {
   // 接收表单的数据
  const userInfo = req.body
  // 定义 SQL 语句
  const sql = `select * from ev_users where username=?`
  // 执行 SQL 语句，根据用户名查询用户的信息
  db.query(sql, userInfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
    if (results.length !== 1) return res.cc('登录失败！')

    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败！')

    //在服务器端生成 Token 的字符串
    const user = { ...results[0], password: '', user_pic: '' }
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    // 调用 res.send() 将 Token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      token:  'Bearer ' + tokenStr,
    })
  })
}