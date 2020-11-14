/*
 * @Author: your name
 * @Date: 2020-11-14 10:29:56
 * @LastEditTime: 2020-11-14 11:11:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BreakingNewsAPI\schema\user.js
 */
const joi = require('@hapi/joi')

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
      },
  }