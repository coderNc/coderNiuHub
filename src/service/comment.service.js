const connection = require('../app/database');


class CommentService{
  //发表评论
  async addComment(user_id,moment_id,content) {
    const statement = `INSERT INTO comment (content, user_id, moment_id) VALUES (?, ?, ?);`;
    const result = await connection.execute(statement,[content,user_id,moment_id]);
    return result[0]
  }
  //评论在评论（回复评论）接口
  async replyComment(user_id,moment_id,content,comment_id) {
    const statement = `INSERT INTO comment (content, user_id, moment_id, comment_id) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement,[content,user_id,moment_id,comment_id]);
    return result[0]
  }
  //修改评论接口
  async patchComment(content, comment_id) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement,[content,comment_id]);
    return result[0]
  }
  //删除评论接口
  async delComment(comment_id){
    try {
      const statement = `DELETE FROM comment WHERE id = ?;`;
      const result = await connection.execute(statement,[comment_id]);
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async getComments(momentId) {
    const statement = `SELECT 
    c.id id, c.content content ,c.comment_id commentId, c.createAt createTime, c.updataAt updateTime,
    JSON_OBJECT('id', u.id, 'name',u.name) user
    FROM comment c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE c.moment_id = ?;`;
    const [result] = await connection.execute(statement,[momentId]);
    return result
  }




}


module.exports = new CommentService()