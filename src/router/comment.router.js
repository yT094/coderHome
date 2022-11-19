const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
} = require("../controller/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

// 发表评论
commentRouter.post("/", verifyAuth, create);
commentRouter.get("/:commentId", detail);
commentRouter.get("/", list);

// 修改评论: 1.用户必须登录 2.用户具备权限(只能修改自己发表的评论)
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update);

// 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);

module.exports = commentRouter;
