const Router = require("koa-router");

commentRouter = new Router({ prefix: "/comment" });

const { create } = require("../controller/comment.controller");
const { verifyAuth } = require("../middleware/auth.middleware");

commentRouter.post("/", verifyAuth, create);

module.exports = commentRouter;
