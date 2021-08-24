const Koa = require('koa');
const cors = require('koa2-cors')
//const cors = require('../constants/cors')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router/index')

const errorHandler = require('./error-handle');

const app = new Koa();

app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
//app.use(cors)


app.use(bodyParser());
//注册路由
useRoutes(app)
//监听错误信息
//发出来的所有错误   return ctx.app.emit('error',error,ctx)
//都会在errorHandler这个函数被处理

app.on('error',errorHandler)



module.exports = app