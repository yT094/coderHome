const Router = require("koa-router");

commentRouter = new Router({ prefix: "/comment" });

const { create, reply, update } = require("../controller/comment.controller");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

// 发表评论
commentRouter.post("/", verifyAuth, create);
// 回复评论
commentRouter.post("/:commentId/reply", verifyAuth, reply);
// 修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update);

module.exports = commentRouter;
