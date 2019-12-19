const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
  ['🐷 Porco', '🐮 Vaca', '🐏 Carneiro'],
  ['🐔 Galinha', '🐣 Eu como é ovo'],
  ['🐟 Peixe', '🦞 Frutos do mar'],
  ['🍄 Eu sou vegetariano',]
]).resize().extra()

bot.start(async ctx => {
  await ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}!`)
  await ctx.reply(`Qual bebida você prefere?`, Markup.keyboard(['Coca Cola', 'Pepsi']).resize().oneTime().extra())
})
bot.hears(['Coca Cola', 'Pepsi'], async ctx => {
  await ctx.reply(`Nossa! Eu também gosto de ${ctx.match}`)
  await ctx.reply(`Qual sua carne predileta?`, tecladoCarne)
})
bot.hears('🐷 Porco', ctx => ctx.reply('Nossa eu adoro 🐷'))
bot.hears('🍄 Eu sou vegetariano', ctx => ctx.reply('Eu estou tentanto me tornar um. Mas está dificil'))
bot.on('text', ctx => ctx.reply('Legal!'))

bot.startPolling()
