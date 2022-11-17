const connections = require("../app/database");

class UserService {
  async create(user) {
    console.log("将用户数据保存到数据库中: ", user);
    const { name, password } = user;
    const statement = `INSERT INTO users (name, password) VALUES (?,?);`;
    const result = await connections.execute(statement, [name, password]);
    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connections.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new UserService();
