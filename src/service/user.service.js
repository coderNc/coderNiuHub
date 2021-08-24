//user接口数据库逻辑操作
const connection = require('../app/database')

class UserService {
  async create (user) {
    const {name, password} =  user;
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [name, password]);
    return result[0]
  }

  async getUserByName(name){
    //通过name来查找数据库
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement,[name]);
    return result[0];
  }
  async getUserById(id){
    //通过id来查找数据库
    //const statement = `SELECT * FROM users WHERE id = ?;`;
    const statement = `SELECT 
    u.id id,u.name name, u.level level,u.createAt createTime,u.updateAt updateTime,
    JSON_ARRAYAGG(JSON_OBJECT('id', m.id , 'content', m.content, 'createTime', m.createAt ,'updateTime' , m.updataAt)) moments
    FROM users u
    LEFT JOIN moment m ON m.user_id = u.id 
    WHERE u.id = ? 
    GROUP BY u.name;`;
    const [result] = await connection.execute(statement,[id]);
    return result[0];
  }

  async delUser(id){
    const statement = `DELETE FROM users WHERE id = ?;`;
    const [result] = await connection.execute(statement,[id]);
    return result
  }
  async getPassword(id){
    const statement = `SELECT * FROM users WHERE id = ?;`
    const [result] = await connection.execute(statement,[id]);
    return result[0];
  }
  async patchPassword(password,id){
    const statement = `UPDATE users SET password = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement,[password,id]);
    return result
  }
  async getData(id){
    const statement = `SELECT 
    m.id id, m.content content, m.createAt createTime, m.updataAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user,
    JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'CommentContent',c.content, 'commentId', c.comment_id, 'createTime', c.createAt ,'updateTime' , c.updataAt ,
      'user', JSON_OBJECT('id',cu.id, 'name', cu.name)
    )) comments
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LEFT JOIN comment c ON c.moment_id = m.id
    LEFT JOIN users cu ON c.user_id = cu.id
    WHERE m.id = 11
    ;
    `;
    const [result] = await connection.execute(statement,[id]);
    return result[0]
  }
}

module.exports = new UserService();

