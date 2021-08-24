const connection = require('../app/database');



class MomentService {
  //添加动态
  async addMoment(user_id, content){
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`;
    const result = await connection.execute(statement, [user_id, content]);
    return result[0]
  }
  //获取全部动态
  async getMoments(limit, offset){
    //const statement = `SELECT * FROM moment;`;
    const statement = `SELECT 
    m.id id, m.content content, m.createAt createTime, m.updataAt updateTime,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentsCount,
    JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ? OFFSET ?;`;
    const result = await connection.execute(statement,[limit,offset])
    return result[0]
  }
  //通过id查看某一条动态的详细信息
  async getMomentById(id) {
    //const statement = `SELECT * FROM moment WHERE id = ?;`;
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
      WHERE m.id = ?
      ;`;
    const [result] = await connection.execute(statement,[id]);
    return result[0]
  }
  //通过id删除动态
  async delMoment(id){
    const statement = `DELETE FROM moment WHERE id = ?;`
    const result = await connection.execute(statement,[id]);
    return result[0]
  }
  //更新动态
  async putMoment(id,content){
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement,[content,id]);
    return result[0]
  }

}


module.exports = new MomentService()