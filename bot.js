const TelegramBot = require('node-telegram-bot-api')

const telegramm_token = '6916655216:AAFChxqRoA7aNpuGvGoYsV11-_tCEwhjhT8'
const telegramm_chat = 925741117
const bot = new TelegramBot(telegramm_token, {
    polling: false
})
bot.sendMessage(telegramm_chat, "text\ntext\ntext")

