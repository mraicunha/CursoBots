const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)



const gerarBotoes = lista => Extra.markup(
  Markup.inlineKeyboard(
    lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
    { columns: 3 }
  )
)
bot.use(session())
const verificaUsuario = (ctx, next) => {
  const mesmoIDMsg = ctx.update.message
    && ctx.update.message.from.id === env.userID
  const mesmoIDCallback = ctx.update.callback_query
    && ctx.update.callback_query.from.id === env.userID

  if (mesmoIDMsg || mesmoIDCallback) {
    next()
  } else {
    ctx.reply(`Desculpe, não fui autorizado a conversar com você...`)
  }
}

const processando = ({ reply }, next) => {
  reply(`Processando...`).then(() => next())
}

bot.start(verificaUsuario, async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo ${name}!`)
  await ctx.reply(`Escreva os itens que deseja adicionar...`)
  ctx.session.lista = []
})

bot.on('text', verificaUsuario, processando, ctx => {
  let msg = ctx.update.message.text
  ctx.session.lista.push(msg)
  ctx.reply(`${ctx.update.message.text} adicionado!`, gerarBotoes(ctx.session.lista))
})

bot.action(/delete (.+)/, verificaUsuario, ctx => {
  ctx.session.lista = ctx.session.lista.filter(item => item !== ctx.match[1])
  ctx.reply(`${ctx.match[1]} deletado!`, gerarBotoes(ctx.session.lista))
})

bot.startPolling()