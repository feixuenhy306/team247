export default async (ctx,next) => {
    const title = "地址"
    await ctx.render('address',{title})
}