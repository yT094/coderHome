const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1.获取 user_id 和 content
    const userId = ctx.response.user.id;
    const content = ctx.request.body.content;

    // 2.将数据插入到数据库
    const result = await momentService.create(userId, content);
    ctx.response.body = result;
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.getMomentById(momentId);
    ctx.response.body = result;
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await momentService.getMomentList(offset, size);
    ctx.response.body = result;
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    // fix: 异常无效的token,可能是解构的值不对
    // const { userId } = ctx.response.body;
    const { id } = ctx.response.user;
    const { content } = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.response.body = result;
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);
    ctx.response.body = result;
  }

  async addLabels(ctx, next) {
    const { momentId } = ctx.params;
    const labelInfo = ctx.response.body;
    console.log("labelInfo", labelInfo);
    for (let labelObj of labelInfo) {
      const labelId = labelObj.id;
      // 判断该标签是否与该动态已经关联
      const isHasLabel = await momentService.hasLabel(momentId, labelId);
      if (!isHasLabel) {
        await momentService.addLabel(momentId, labelId);
      }
    }
    ctx.body = "给动态添加标签成功~";
  }
}

module.exports = new MomentController();
