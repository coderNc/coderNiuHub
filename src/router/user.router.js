const Router = require('koa-router');
const userRouter = new Router({prefix: '/users'});
//逻辑处理函数
const {
  create,
  userLogin,
  getUserById,
  delUser,
  patchPassword,
  getData
} = require('../controller/user.controller')

//验证处理中间件
const {
  verifyUser,
  handlePassword,
  verifyPassword
} = require('../middleware/user.middleware')

//验证中间件
const{
  verifyAuth,
  verifyAdmin
} = require('../middleware/auth.middleware')



//用户注册接口   规则校验         密码加密
userRouter.post('/', verifyUser, handlePassword , create );
//根据id获取用户的详细信息
userRouter.get('/:id',getUserById)
//删除用户接口
userRouter.delete('/:id',verifyAuth ,verifyAdmin, delUser)
//修改密码接口
userRouter.patch('/repassword',verifyAuth, verifyPassword, patchPassword)
//测试接口
//userRouter.get('/data',getData)

module.exports = userRouter;