const product = require('./../models/product.js');
export default async (ctx, next) => {
    //增加产品
   var res = await product.insert(ctx.request.body)
   ctx.body = res
}