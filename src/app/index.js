const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handle");

const app = new Koa();

const useRoutes = require("../router");

// 保持队形 - useRoutes 用 this 绑定
app.userRoutes = useRoutes;

app.use(bodyParser());
app.userRoutes();
app.on("error", errorHandler);

module.exports = app;
