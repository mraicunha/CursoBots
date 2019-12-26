const env = require('../.env')
const Telegram = require('telegraf/telegram')
const axios = require('axios')
const Markup = require('telegraf/markup')

const enviarMensagem = msg => {
  axios.get(`${env.apiUrl}/sendMessage?chat_id=${env.userID}&text=${encodeURI(msg)}`)
    .catch(e => {
      console.log(e);
    })
}

enviarMensagem('Enviado a mensagem de forma assincrona')

const teclado = Markup.keyboard([
  ['Ok', 'Cancelar']
]).resize().oneTime().extra()

const telegram = new Telegram(env.token)
telegram.sendMessage(env.userID, 'Essa é uma mensagem com teclado', teclado)