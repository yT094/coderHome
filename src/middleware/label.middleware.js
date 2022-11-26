const labelService = require("../service/label.service");

/**
 *
 * @param {*} labels 待查询的标签数组
 * @param {*} newLabels 标签数组对象(含id)
 */
const verifyLabelExists = async (ctx, next) => {
  console.log("验证标签是否存在的middleware~~");
  // 1.取出要添加的所有标签
  const { labels } = ctx.request.body;

  // 2.判断每一个标签在 label 表中是否存在, 若不存在, 需要创建该标签
  const newLabels = [];
  for (let label of labels) {
    console.log(label);
    const labelObj = { label };
    const isHasLabel = await labelService.getLabelByName(label);
    if (!isHasLabel) {
      // 创建该标签
      const result = await labelService.create(label);
      labelObj.id = result.insertId;
    } else {
      labelObj.id = isHasLabel.id;
    }
    newLabels.push(labelObj);
  }
  ctx.response.body = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};
