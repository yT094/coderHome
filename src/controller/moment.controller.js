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

    // 问题一: 如何获取 labelId ?
    // 问题二: 将 momentId 与 labelId 写入到 moment_label 中的步骤
    // 步骤一: 判断二者是否已有关联
    // 步骤二: 将二者插入到 moment_label 中

    // for (let label of labels) {
    //   // 传入 标签名 得到标签 id
    //   const isHasLabel = await momentService.hasLabel(label);
    //   if (!isHasLabel) {
    //     const { insertId } = await momentService.createLabel(label);
    //     const result = await momentService.addMomentIdLabelId(
    //       momentId,
    //       insertId
    //     );
    //     ctx.response.body = result;
    //   }
    // }
  }
}

module.exports = new MomentController();
