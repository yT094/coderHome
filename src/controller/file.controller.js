const fileService = require("../service/file.service");

class FileController {
  async saveAvatarInfo(ctx, next) {
    console.log("111");
    // 1.获取图像相关的信息
    // 注意: 获取图片信息及用户信息使用的接口
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.response.user;

    // 2.将图像信息数据保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id);

    // 返回结果
    ctx.body = result;
  }
}

module.exports = new FileController();
