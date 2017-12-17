const product = require('./../models/product.js');
export default async (ctx,next) => {
  var res = await product.findList()
  ctx.body = res
  next()
}