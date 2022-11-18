class CommentController {
  async create(ctx, next) {
    ctx.response.body = "发表评论成功";
  }
}

module.exports = new CommentController();
