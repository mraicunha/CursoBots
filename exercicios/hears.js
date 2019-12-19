const env = require('../.env')
const moment = require('moment')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.hears([/pizza/i, '🍕'], ctx => ctx.reply('Quero!'))
bot.hears(/(\d{2}\/\d{2}\/\d{4})/, async ctx => {
  moment.locale('pt-BR')
  const data = moment(ctx.match[1], 'DD/MM/YYYY')
  ctx.reply(`${ctx.match[1]} ${data.format('dddd')}`)
})

bot.startPolling()