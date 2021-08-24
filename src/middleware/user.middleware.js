//用户接口中间件处理

const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5PassWord = require('../utils/password-handle')

//验证用户处理中间件
const verifyUser = async (ctx, next) => {
  //1.获取用户名和密码
  const {name, password} = ctx.request.body;
  //2.判断用户名和密码不能为空
  //传过来的值可能为：undefined null '';
  if(!name || !password){
    //console.log('没有传值或者值为空！！');
    //const error = new Error()

    return ctx.app.emit('error',errorTypes.NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }else{
    //3.判断本次的注册的用户名有没有被注册过
    const result = await service.getUserByName(name)
    console.log(result[0]);
    //
    if(result.length){
      //如果结果不为空则用户以及被注册
      return ctx.app.emit('error',errorTypes.USER_ALREADY_EXISTS,ctx)
    }else{
      await next();
    }
  }
}

//密码加密处理中间件
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5PassWord(password);
  await next();
}
//修改密码中间件
const verifyPassword = async (ctx, next) => {
  const {id} = ctx.user
  const {oldPassword,newPassword} = ctx.request.body;
  //验证新旧密码不为空
  if(!oldPassword || !newPassword){
    return ctx.app.emit('error',errorTypes.PASSWORD_IS_REQUIRED,ctx)
  }
  const {password} = await service.getPassword(id);
  //验证密码匹配
  if(md5PassWord(oldPassword) !== password){
    return ctx.app.emit('error',errorTypes.USER_PASSWORD_ERR,ctx)
  }
  await next();
}

module.exports = {
  verifyUser,
  handlePassword,
  verifyPassword
}