const connections = require("../app/database");

const sqlFragment = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id`;

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?,?);`;
    const [result] = await connections.execute(statement, [userId, content]);
    return result;
  }

  async getMomentById(momentId) {
    const statement = `
    ${sqlFragment}
    WHERE m.id = ?`;
    const [result] = await connections.execute(statement, [momentId]);
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `
    ${sqlFragment}
    LIMIT ?,?`;
    const [result] = await connections.execute(statement, [offset, size]);
    return result;
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [content, momentId]);
    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();
