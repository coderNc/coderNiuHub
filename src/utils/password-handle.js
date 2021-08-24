const crypto = require('crypto');




const md5PassWord = (password) => {
  //创建MD5规则
  const md5 = crypto.createHash('md5');
  //使用MD5将密码加密并用十六进制将结果返回
  const result = md5.update(password).digest('hex');
  return result;
}

module.exports = md5PassWord