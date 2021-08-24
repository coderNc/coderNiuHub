const Router = require('koa-router')
const{
  addLabel
} = require('../controller/label.controller')
const {
  verifyAuth
} = require('../middleware/auth.middleware')

const labelRouter = new Router({prefix:'/label'});




labelRouter.post('/', verifyAuth, addLabel)






module.exports = labelRouter