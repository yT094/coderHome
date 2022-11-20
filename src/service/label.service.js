const connections = require("../app/database");

class labelService {
  async create(labelName) {
    const statement = `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connections.execute(statement, [labelName]);
    return result;
  }
}

module.exports = new labelService();
