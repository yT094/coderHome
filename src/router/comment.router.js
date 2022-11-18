const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { create, list } = require("../controller/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

// 发表评论
commentRouter.post("/", verifyAuth, create);
commentRouter.get("/:commentId", list);

module.exports = commentRouter;
