const labelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await labelService.create(name);
    ctx.response.body = result;
  }
}

module.exports = new LabelController();
