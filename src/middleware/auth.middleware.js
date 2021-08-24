//登录接口处理中间件
const jwt = require('jsonwebtoken')
const errorTypes = require('../constants/error-types');
const service = require('../service/user.service')
const momentService = require('../service/moment.service')
const authService = require('../service/auth.service')
const md5PassWord = require('../utils/password-handle')
const {PUNLIC_KEY} = require('../app/config')

//登录验证
const verifyLogin = async (ctx, next) => {
  //1.获取用户名和密码
  const {name, password} = ctx.request.body;
  //2.判断用户名和密码不能为空
  //传过来的值可能为：undefined null '';
  if(!name || !password){
    //console.log('没有传值或者值为空！！');
    return ctx.app.emit('error',errorTypes.NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }
  //3.判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0]
  console.log(user);
  if(!user){
    //如果用户不存在
    return ctx.app.emit('error',errorTypes.USER_DOSE_NOT_EXISTS,ctx)
  }
  //如果用户存在
  //4.判断密码是否一致
  if(md5PassWord(password) !== user.password){
    //密码比对失败
    return ctx.app.emit('error',errorTypes.USER_PASSWORD_ERR,ctx)
  }
  //密码比对成功
  console.log("验证成功");
  //将用户写入ctx中
  ctx.user = user
  await next();
}
//验证是否登录
const verifyAuth = async (ctx, next) => {
  //1.取出token
  //console.log(ctx.headers);
  //如果没有传token则返回错误
  if(!ctx.headers.authorization){
    return ctx.app.emit('error',errorTypes.UNTOKEN,ctx)
  }
  const authorization = ctx.headers.authorization
  const token = authorization.replace('Bearer ','');
  try {
    const result = jwt.verify(token,PUNLIC_KEY,{
      algorithms:["RS256"]
    });
    ctx.user = result;
    await next();
  } catch (error) {
    ctx.app.emit('error', errorTypes.TOKEN_ERR, ctx)
  }


  //console.log(result);

}
//验证是自己否有权限
const verifyPermission = async (ctx, next) => { 
  const [key] = Object.keys(ctx.params);
  const tableName = key.replace('Id','');
  const id = ctx.params[key]
  const userId = ctx.user.id;
  console.log(tableName, id, userId);
  const isPermission = await authService.check(tableName, id, userId)
  console.log(isPermission);
  if(!isPermission){
    return ctx.app.emit('error',errorTypes.NOT_AUTH,ctx)
  }
  await next();

}
//验证是否为管理员
const verifyAdmin = async (ctx, next) => {
  const {id} = ctx.user
  const users = await service.getUserById(id);
  if(!users.level){
    return ctx.app.emit('error',errorTypes.NOT_ADMIN,ctx)
  }
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
  verifyAdmin
}