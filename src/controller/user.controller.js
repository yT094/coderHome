const fs = require("fs");

const userService = require("../service/user.service");
const fileService = require("../service/file.service");
const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;
    console.log("user", user);

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    // 1.从数据库查询出头像信息
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    console.log("userId", userId, avatarInfo);

    // 2.提供图像信息供浏览器渲染
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
