const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { create, detail, list } = require("../controller/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

// 发表评论
commentRouter.post("/", verifyAuth, create);
commentRouter.get("/:commentId", detail);
commentRouter.get("/", list);

module.exports = commentRouter;
