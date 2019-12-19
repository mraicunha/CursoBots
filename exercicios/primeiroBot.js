const env = require('../.env')
const telegraf = require('telegraf')
const bot = new telegraf(env.token)

bot.start(ctx => {
  const from = ctx.update.message.from
  console.log(from);
  ctx.reply(`Seja bem vindo, ${from.first_name}!`)
})

bot.on('text', (ctx, next) => {
  ctx.reply('Mid 1')
  next()
})

bot.on('text', (ctx, next) => {
  ctx.reply('Mid 2')
  next()
})

bot.startPolling()
