const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)
const Markup = require('telegraf/markup')

bot.start(ctx => {
  const name = ctx.update.message.from.first_name
  ctx.reply(`Seja bem vindo ${name}!! 😘
  Me avise se previsar de /suporte`)
})

bot.command('suporte', ctx => {
  ctx.reply(`Vou te mostrar as opção:
/helpdesk: Para suporte Help Desk
/datacenter: Para suporte Datacenter`,  Markup.keyboard(['/datacenter', '/helpdesk']).resize().extra())
})

bot.command('helpdesk', ctx => {
  ctx.reply(`Você solicitou o suporte help desk`)
})

bot.command('datacenter', ctx => {
  ctx.reply(`Você solicitou o suporte help desk`)
})

bot.startPolling()