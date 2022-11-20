const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

// 创建标签
labelRouter.post("/", verifyAuth, create);

module.exports = labelRouter;
