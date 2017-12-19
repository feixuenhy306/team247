const product = require('./../models/product.js');
export default async (ctx,next) => {
    //修改产品
    var res = await product.update(ctx.request.body)
    ctx.body = res
}