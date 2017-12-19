const product = require('./../models/product.js');
export default async (ctx, next) => {
    //增加产品
   var res = await product.search(ctx.request.query.info)

   ctx.body = res
}