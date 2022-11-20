const commentService = require("../service/comment.service");

class CommentRouter {
  async create(ctx, next) {
    const { id } = ctx.response.user;
    const { momentId, content } = ctx.request.body;
    const result = await commentService.create(id, momentId, content);
    ctx.response.body = result;
  }

  async reply(ctx, next) {
    const { id } = ctx.response.user;
    // 这个地方要用解构
    const { commentId } = ctx.params;
    const { momentId, content } = ctx.request.body;
    const result = await commentService.reply(id, momentId, commentId, content);
    ctx.response.body = result;
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await commentService.update(commentId, content);
    ctx.response.body = result;
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.remove(commentId);
    ctx.response.body = result;
  }
}

module.exports = new CommentRouter();
