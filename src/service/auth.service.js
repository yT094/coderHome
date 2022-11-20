const connections = require("../app/database");
class AuthService {
  // id: momentId/commentId
  async checkSource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connections.execute(statement, [id, userId]);

    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();
