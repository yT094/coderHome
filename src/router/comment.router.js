const Router = require("koa-router");

commentRouter = new Router({ prefix: "/comment" });

const { create, reply } = require("../controller/comment.controller");
const { verifyAuth } = require("../middleware/auth.middleware");

commentRouter.post("/", verifyAuth, create);
commentRouter.post("/:commentId/reply", verifyAuth, reply);

module.exports = commentRouter;
