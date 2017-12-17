const product = require('./../models/product.js');
export default async (ctx, next) => {
  const title = 'koa2 title'
  var prod = {},err=null,result=null
  prod.name = '3244'
  prod.description = '324423'
  prod.price = 2.5
    var result = null
  product.findOne("1",function (err,res) {
      result = res
  })


  await ctx.render('index', {
      result
  })
}
