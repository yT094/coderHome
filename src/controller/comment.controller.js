const commentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    // 1.获取 user_id 和 content
    const userId = ctx.response.user.id;
    const content = ctx.request.body.content;

    // 2.将数据插入到数据库
    const result = await commentService.create(userId, content);
    ctx.response.body = result;
  }
}

module.exports = new CommentController();
