const connections = require("../app/database");

const sqlFragment = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM comment m
    LEFT JOIN users u ON m.user_id = u.id`;

class CommentService {
  async create(userId, content) {
    const statement = `INSERT INTO comment (user_id, content) VALUES (?,?);`;
    const [result] = await connections.execute(statement, [userId, content]);
    return result;
  }

  async getCommentById(commentId) {
    const statement = `
    ${sqlFragment}
    WHERE m.id = ?`;
    const [result] = await connections.execute(statement, [commentId]);
    return result[0];
  }

  async getCommentList(offset, size) {
    const statement = `
    ${sqlFragment}
    LIMIT ?,?`;
    const [result] = await connections.execute(statement, [offset, size]);
    return result;
  }

  async update(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [content, commentId]);
    return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connections.execute(statement, [commentId]);
    return result;
  }
}

module.exports = new CommentService();
