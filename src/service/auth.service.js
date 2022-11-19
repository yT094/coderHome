const connections = require("../app/database");

class AuthService {
  async checkSource(commentId, userId) {
    console.log(commentId, userId);
    const statement = `SELECT * FROM comment WHERE id = ? AND user_id = ?;`;
    const [result] = await connections.execute(statement, [commentId, userId]);

    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();
