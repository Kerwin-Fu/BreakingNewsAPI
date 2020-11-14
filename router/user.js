/*
 * @Author: your name
 * @Date: 2020-11-12 16:32:09
 * @LastEditTime: 2020-11-14 10:36:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \BreakingNewsAPI\router\user.js
 */

const express = require('express')

const router = express.Router()
//引入处理函数
const userHandler = require('./router_handler/user')

const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')


//注册
router.post('/reguser',expressJoi(reg_login_schema), userHandler.reguser)
//登录
router.post('/login', userHandler.login)

module.exports = router
