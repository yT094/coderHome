const fileService = require("../service/file.service");
const userService = require("../service/user.service");

const { APP_HOST, APP_PORT } = require("../app/config");

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关的信息
    // 注意: 获取图片信息及用户信息使用的接口
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.response.user;

    // 2.将图像信息数据保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id);

    // 3.将图片地址保存到 users 表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarurlById(avatarUrl, id);

    // 4.返回结果
    ctx.body = "上传头像成功~";
  }

  async savePictureInfo(ctx, next) {
    // 1.获取配图信息
    const files = ctx.req.files;
    const { id } = ctx.response.user;
    const { momentId } = ctx.query;

    // 2.将所有的配图信息保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }

    // 3.返回结果
    ctx.body = "上传配图成功~";
  }
}

module.exports = new FileController();
