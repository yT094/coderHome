const connections = require("../app/database");

class CommentService {
  async create(userId, momentId, commentId) {
    const statement = `INSERT INTO comment (user_id, moment_id, content) VALUES (?,?,?);`;
    const [result] = await connections.execute(statement, [
      userId,
      momentId,
      commentId,
    ]);
    return result;
  }
}

module.exports = new CommentService();
