const env = require('../.env')
const telegraf = require('telegraf')
const bot = new telegraf(env.token)

bot.start(ctx => {
  const from = ctx.update.message.from
  console.log(from);
  
  if (from.id === env.client_id) {
    ctx.reply(`Olá Mestre, ${from.first_name}!`)
  }else{
    ctx.reply(`Desculpe mas só respondo a um mestre`)
  }
})
bot.startPolling()