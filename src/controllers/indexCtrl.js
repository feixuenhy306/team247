const product = require('./../models/product.js');
export default async (ctx, next) => {
  const title = '产品列表'

  await ctx.render('index', {
      title
  })
}
