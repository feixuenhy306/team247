const product = require('./../models/product.js');
export default async (ctx, next) => {
    var pro = null
    // product.insert(ctx.request.body,function (err,res) {
    //   result = err
    // })

   var res = await product.insert(ctx.request.body)
    ctx.body = res
    next()
}