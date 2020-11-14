/*
 * @Author: your name
 * @Date: 2020-11-12 16:28:57
 * @LastEditTime: 2020-11-14 14:28:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BreakingNewsAPI\app.js
 */
/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 */


const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
//设置跨域代理
app.use(cors())
//设置数据解码
app.use(express.urlencoded({ extended:false }))

//错误中间件需要的模块
const joi = require('@hapi/joi')

app.use((req, res, next) => {
    res.cc= (err,status = 1)=> {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

//引入用户路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)


// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)
  })


app.listen(3070,()=> {
    console.log('https://127.0.0.1:3070');
})



