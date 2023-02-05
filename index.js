const express = require('express');
require("dotenv").config();
const app = express();
const removeVietnameseTones = require('./parseVn.js');
const data = require('./data.json')
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELE_TOKEN
const bot = new TelegramBot(token, { polling: true });

const port = process.env.PORT || 8000


bot.on('error', function (err) { })

// console.log(dataFile[0].data[0].length)
// console.log("Question",dataFile[0].data[1][0])
// console.log(data)
bot.on('message', (message) => {
  // handle message
  const chatId = message?.chat?.id;
  let searchString = ""
  const contents = removeVietnameseTones(message.text.toLowerCase())
  for (let i = 0; i < data.length; i++) {
    searchString = removeVietnameseTones(data[i].massage.toLowerCase())
    if (contents === searchString) {
      setTimeout(() => {
      bot.sendMessage(chatId, data[i].reply)
        if (data[i].send_next) {
          setTimeout(() => {
            bot.sendMessage(chatId, data[i].send_next)
          }, 500)
      }
      },data[i].delay)
      return
    }
    if (contents.includes(searchString) || searchString.includes(contents)) {
            setTimeout(() => {
      bot.sendMessage(chatId, data[i].reply)
        if (data[i].send_next) {
          setTimeout(() => {
            bot.sendMessage(chatId, data[i].send_next)
          }, 500)
      }
      },data[i].delay)
      return
    }
  }
  if(contents !== searchString){
      bot.sendMessage(chatId, "Em không biết trả lời sao nữa, hãy hỏi em câu khác  nhé 😢")
    }
  
})




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})



