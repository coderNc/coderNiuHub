//存放接口逻辑处理函数

//导入数据库逻辑操作
const service = require('../service/user.service')
const md5PassWord = require('../utils/password-handle')

class UserController {
  //用户注册处理函数
  async create (ctx, next) {
    //获取用户请求参数
    const user = ctx.request.body;
    //操作数据库 需要单独封装
    const result = await service.create(user)
    //返回数据
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //根据id获取用户的详细信息
  async getUserById(ctx, next) {
    const {id} = ctx.params;
    const result = await service.getUserById(id)
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //删除用户接口
  async delUser( ctx, next) {
    const {id} = ctx.params;
    const result = await service.delUser(id);
    ctx.body = {
      code:10000,
      data:result
    }
  }
  //修改密码接口
  async patchPassword(ctx, next) {
    const {id} = ctx.user
    const {newPassword} = ctx.request.body
    const result = await service.patchPassword(md5PassWord(newPassword),id);
    //ctx.body = newPassword
    ctx.body = {
      code:10000,
      data:result
    }
  }


}




module.exports = new UserController();