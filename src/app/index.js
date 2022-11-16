const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handle");

const userRouter = require("../router/user.router");

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.on("error", errorHandler);

module.exports = app;
