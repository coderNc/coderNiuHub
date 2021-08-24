const Router = require('koa-router');
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')
const {
  createMoment,
  getMoments,
  getMomentById,
  delMoment,
  putMoment
} = require('../controller/moment.controller')

const momentRouter = new Router({prefix:'/moment'})

//发表动态接口
momentRouter.post('/', verifyAuth, createMoment)
//获取全部动态接口
momentRouter.get('/',getMoments)
//根据id获取动态接口
momentRouter.get('/:momentId', getMomentById)
//删除动态接口
momentRouter.delete('/:momentId', verifyAuth , verifyPermission ,delMoment)
//更新动态接口
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, putMoment)





module.exports = momentRouter