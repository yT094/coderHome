const Router = require("koa-router");

commentRouter = new Router({ prefix: "/comment" });

const {
  create,
  reply,
  update,
  remove,
} = require("../controller/comment.controller");
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
// 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);

module.exports = commentRouter;
