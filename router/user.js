
const express = require('express')

const router = express.Router()
//引入处理函数
const userHandler = require('./router_handler/user')
//注册
router.post('/reguser', userHandler.reguser)
//登录
router.post('/login', userHandler.login)

module.exports = router
