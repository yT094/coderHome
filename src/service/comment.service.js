const connections = require("../app/database");

class CommentService {
  async create(userId, momentId, content) {
    const statement = `INSERT INTO comment (user_id, moment_id, content) VALUES (?,?,?);`;
    const [result] = await connections.execute(statement, [
      userId,
      momentId,
      content,
    ]);
    return result;
  }

  async reply(userId, momentId, commentId, content) {
    const statement = `INSERT INTO comment (user_id, moment_id, comment_id, content) VALUES (?,?,?,?);`;
    const [result] = await connections.execute(statement, [
      userId,
      momentId,
      commentId,
      content,
    ]);
    return result;
  }
}

module.exports = new CommentService();
