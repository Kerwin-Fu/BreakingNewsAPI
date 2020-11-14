/*
 * @Author: your name
 * @Date: 2020-11-14 10:29:56
 * @LastEditTime: 2020-11-14 10:34:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \BreakingNewsAPI\schema\user.js
 */
const join = require('@hapi/joi')

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()


  exports.regNlogin_schema = {
      body: {
          username,
          password
      }
  }