const CommentService = require('../service/comment.service')

class CommentConteoller {
  //发表评论
  async addComment (ctx, next) {
    const userId = ctx.user.id;
    const {momentId, content} = ctx.request.body;
    const result = await CommentService.addComment(userId,momentId,content);
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //评论在评论（回复评论）接口
  async replyComment(ctx, next) {
    const userId = ctx.user.id;
    const {momentId, content, commentId} = ctx.request.body;
    const result = await CommentService.replyComment(userId,momentId,content,commentId);
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //修改评论接口
  async patchComment(ctx, next) {
    const {commentId} = ctx.params
    const {content} = ctx.request.body
    const result = await CommentService.patchComment(content,commentId);
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //删除评论接口
  async delComment(ctx, next) {
    const {commentId} = ctx.params
    const result = await CommentService.delComment(commentId);
    ctx.body = {
      code:10000,
      data:result
    }
  }

  async getComments(ctx, next) {
    const {momentId} = ctx.query
    const result = await CommentService.getComments(momentId);

    ctx.body = result
  }



}


module.exports = new CommentConteoller()