const connections = require("../app/database");
const labelService = require("../service/label.service");

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
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) author,
      JSON_ARRAYAGG(
        JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
        )
      ) comments
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id	
    LEFT JOIN comment c ON c.moment_id = m.id
    # moment 的 users 与 comment 的 users 可能不同, 需单独写一个
    LEFT JOIN users cu ON c.user_id = cu.id    
    WHERE m.id = ?`;
    const [result] = await connections.execute(statement, [momentId]);
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
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

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label ml WHERE ml.moment_id = ? AND ml.label_id = ?;`;
    const [result] = await connections.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?,?);`;
    const result = await connections.execute(statement, [momentId, labelId]);
    return result[0];
  }
}

module.exports = new MomentService();
