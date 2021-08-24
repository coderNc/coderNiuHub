//错误处理


const errorHandler = (error, ctx) => {
  const {errCode, errMsg} = error;
  console.log(errCode, errMsg);
  console.log(error);

  let status,message;
  switch(errCode){
    case 10001:
      status = 200;
      message = "用户名或密码为空！！！";
      break;
    case 10002:
      status = 200;
      message = "用户名已经存在！！！";
      break;
    case 10003:
      status = 200;
      message = "用户名不存在！！！";
      break;
    case 10004:
      status = 200;
      message = "密码错误！！！";
      break;
    case 10005:
      status = 200;
      message = "无token！！！";
      break;
    case 10006:
      status = 200;
      message = "无效的token！！！";
      break;
    case 10007:
      status = 200;
      message = "无管理员权限！！！";
      break;
    case 10008:
      status = 200;
      message = "密码为空！！！";
      break;
    case 10009:
      status = 200;
      message = "没有权限！！！";
      break;
    default:
      status = 404;
      message = "NOT FOUND11";
  }



  ctx.status = status;
  ctx.body = {
    code:errCode,
    errMsg:message
  }
}



module.exports = errorHandler;