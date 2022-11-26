const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");

const { avatarHandler } = require("../middleware/file.middleware");

const fileRouter = new Router({ prefix: "/upload" });

// 创建标签
fileRouter.post("/", verifyAuth, avatarHandler);

module.exports = fileRouter;
