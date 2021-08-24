//登录逻辑处理
const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = require('../app/config')
const service = require('../service/user.service')

class AuthController {
  async userLogin(ctx, next) {
    //1.写入token
    const {id , name} = ctx.user
    const token = jwt.sign({id , name}, PRIVATE_KEY , {
      expiresIn: 60 * 60 * 24,
      algorithm:"RS256"
    })
    const result = await service.getUserById(ctx.user.id);
    //2.返回结果
    result.token = token
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //登录成功返回
  async success(ctx,next) {
    const result = await service.getUserById(ctx.user.id);
    console.log(result);
    ctx.body = {
      code:10000,
      data:result
    }
  }
  async getData(ctx, next){
    const {id} = ctx.request.body
    const result = await service.getData(id);
    ctx.body = {
      code:10000,
      data:result
    }  

  }
  
}



module.exports = new AuthController();