const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, list } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

// 创建标签
labelRouter.post("/", verifyAuth, create);

// 获取标签列表：用户发布动态时，提供已有的标签列表供用户选择
labelRouter.get("/", list);

module.exports = labelRouter;
