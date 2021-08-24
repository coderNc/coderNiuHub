const Router = require('koa-router');
const {
  userLogin,
  success,
  getData
} = require('../controller/auth.controller')

const { verifyLogin,verifyAuth } = require('../middleware/auth.middleware')

const authRouter = new Router();


authRouter.post('/login', verifyLogin, userLogin)
authRouter.get('/test',verifyAuth , success)
authRouter.get('/data',getData)


module.exports = authRouter