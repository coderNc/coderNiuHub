const connection = require('../app/database')
class LabelService{
  async addLabel(name){
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const result = await connection.execute(statement,[name]);
    return result[0]
  }
}




module.exports = new LabelService()