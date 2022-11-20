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

  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [content, commentId]);
    return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connections.execute(statement, [commentId]);
    return result;
  }

  async getCommentsByMomentId(momentId) {
    const statement = `
    SELECT
      m.id, m.content, m.comment_id commentId, m.createAt createTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM comment m
    LEFT JOIN users u ON u.id = m.user_id
    WHERE moment_id = 22
    `;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();
