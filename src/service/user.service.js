const connections = require("../app/database");

class UserService {
  async create(user) {
    console.log("将用户数据保存到数据库中: ", user);
    const { name, password } = user;

    const statement = `INSERT INTO users (name, password) VALUES (?,?);`;

    const result = await connections.execute(statement, [name, password]);

    return "创建用户成功";
  }
}

module.exports = new UserService();
