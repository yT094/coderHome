const connections = require("../app/database");

class labelService {
  async create(labelName) {
    const statement = `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connections.execute(statement, [labelName]);
    return result;
  }

  async getLabelByName(labelName) {
    const statement = `SELECT * FROM label l WHERE l.name = ?;`;
    const [result] = await connections.execute(statement, [labelName]);
    return result[0];
  }
}

module.exports = new labelService();
