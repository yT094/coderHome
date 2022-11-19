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

  async detail(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.getCommentById(commentId);
    ctx.response.body = result;
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await commentService.getCommentList(offset, size);
    ctx.response.body = result;
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    // fix: 异常无效的token,可能是解构的值不对
    // const { userId } = ctx.response.body;
    const { id } = ctx.response.user;
    const { content } = ctx.request.body;
    const result = await commentService.update(content, commentId);
    ctx.response.body = result;
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.remove(commentId);
    ctx.response.body = result;
  }
}

module.exports = new CommentController();
