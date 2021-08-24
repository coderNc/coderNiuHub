
const app = require('./app')
const config = require('./app/config')
require('./app/database')







//console.log(process.env.APP_PORT);

app.listen(config.APP_PORT , () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功！！！`);
});