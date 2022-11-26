const Multer = require("koa-multer");

const avatarUpload = Multer({
  dest: "./uploads/avatar",
});

const avatarHandler = avatarUpload.single("avatar");

module.exports = {
  avatarHandler,
};
