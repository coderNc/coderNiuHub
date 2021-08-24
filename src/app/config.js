
//解析全局环境变量
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
//读取.env文件配置
dotenv.config();

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
const PUNLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))


//导出环境变量
module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD

} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUNLIC_KEY = PUNLIC_KEY;
