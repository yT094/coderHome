const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const { verifyLabelExists } = require("../middleware/label.middleware");

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

// 发表动态
momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", list);

// 修改动态: 1.用户必须登录 2.用户具备权限(只能修改自己发表的动态)
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

// 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

// 添加标签：给某条动态添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
