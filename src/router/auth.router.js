const Router = require("koa-router");

const { login } = require("../controller/auth.controller");
const { verifyLogin } = require("../middleware/auth.middleware");

const authRouter = new Router({ prefix: "/login" });

authRouter.post("/", verifyLogin, login);

module.exports = authRouter;
