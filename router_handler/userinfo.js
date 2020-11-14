/*
 * @Author: your name
 * @Date: 2020-11-14 14:27:11
 * @LastEditTime: 2020-11-14 14:32:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BreakingNewsAPI\router_handler\userinfo.js
 */
// 导入数据库操作模块
const db = require("../db/index");

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`;
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("获取用户信息失败");

    //将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: results[0],
    });
  });
};
