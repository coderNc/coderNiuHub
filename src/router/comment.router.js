const Router = require('koa-router')

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

const commentRouter = new Router({prefix:'/comment'});

const {
  addComment,
  replyComment,
  patchComment,
  delComment,
  getComments
} = require('../controller/comment.controller')




//发表评论接口
commentRouter.post('/', verifyAuth , addComment)
//评论在评论（回复评论）接口
commentRouter.post('/reply', verifyAuth, replyComment)
//修改评论接口
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, patchComment)
//删除评论接口
commentRouter.delete('/:commentId',verifyAuth, verifyPermission, delComment)
//获取评论列表接口
commentRouter.get('/', getComments)

module.exports = commentRouter