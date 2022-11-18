const connections = require("../app/database");

class CommentService {
  async create(userId, content) {
    const statement = `INSERT INTO comment (user_id, content) VALUES (?,?);`;
    const [result] = await connections.execute(statement, [userId, content]);
    return result;
  }
}

module.exports = new CommentService();
