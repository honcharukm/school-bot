import { 
    Context, 
    Telegraf, 
    Telegram,
    session,
    Scenes 
} from 'telegraf'
import * as dotenv from 'dotenv'
import { 
    authorizeUser
} from './middleware/authorizeUser'
import dbInit from './db/init'
import startScene from './scenes/startScene'

dotenv.config()
dbInit()

const bot = new Telegraf<Scenes.WizardContext>(process.env.TELEGRAM_TOKEN as string)

const stage = new Scenes.Stage<Scenes.WizardContext>([ startScene ])

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
    ctx.reply('Hi here! I\'m super puper school bot than help you follow the schedule')
    ctx.scene.enter('startScene')
})

bot.command('test', ctx => {
    ctx.reply('test')
})


bot.use(authorizeUser)

bot.launch()