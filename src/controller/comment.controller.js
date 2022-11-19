const commentService = require("../service/comment.service");

class CommentRouter {
  async create(ctx, next) {
    const { id } = ctx.response.user;
    const { momentId, content } = ctx.request.body;
    const result = await commentService.create(id, momentId, content);
    ctx.response.body = result;
  }
}

module.exports = new CommentRouter();
