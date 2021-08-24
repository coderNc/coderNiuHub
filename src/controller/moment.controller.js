//发表动态逻辑处理

const service = require('../service/moment.service')
const errorTypes = require('../constants/error-types')
class MomentController {
  async createMoment(ctx, next){
    //1.获取数据（user_id  content）
    const user_id = ctx.user.id;
    const {content} = ctx.request.body
    //console.log(user_id,content);

    //2.将数据插入到数据库
    const result = await service.addMoment(user_id, content);
    //console.log(result);
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //分页获取全部动态
  async getMoments(ctx, next) {
    const {limit, offset} = ctx.query
    console.log(limit,offset);
    
    const result = await service.getMoments(limit,offset);
    ctx.body = {
      code:10000,
      data:result
      
    }
  }
  //通过id查看某一条动态的详细信息
  async getMomentById (ctx, next){
    //1.获取id
    const {momentId} = ctx.params;
    //2.查询数据库
    const result = await service.getMomentById(momentId)
    ctx.body = {
      code:10000,
      data:result
    };
  }
  //删除动态接口
  async delMoment (ctx, next) {
    const { momentId } = ctx.params
    const result = await service.delMoment(momentId);
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //更新动态接口
  async putMoment(ctx, next){
    const { momentId } = ctx.params
    const {content} = ctx.request.body
    const result = await service.putMoment(momentId, content);
    ctx.body = {
      code:10000,
      data:result
    }
  }
}


module.exports = new MomentController()








