const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const userService = require("../service/user.service");
const authService = require("../service/auth.service");

const errorTypes = require("../constants/errors-types");

const md5password = require("../utils/password-handle");

const verifyLogin = async (ctx, next) => {
  console.log("验证登录的middleware~");

  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 3.判断用户是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 4.判断密码是否与数据库中的密码一致（加密）
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.response.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log("验证登录授权的middleware~");
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token (id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.response.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
};

const verifyPermission = async (ctx, next) => {
  console.log("验证权限的middleware");
  // 1.获取参数
  const { commentId } = ctx.params;
  const { id } = ctx.response.user;

  // 2.查询是否具备权限
  const isPermission = await authService.checkSource(commentId, id);
  if (!isPermission) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
