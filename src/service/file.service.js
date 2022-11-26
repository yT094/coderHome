const connections = require("../app/database");

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?)`;
    const [result] = await connections.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);

    return result;
  }
}

module.exports = new FileService();
