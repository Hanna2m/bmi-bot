require('dotenv').config()
const TOKEN = process.env.TOKEN

const {Telegraf, Scenes, session, } = require('telegraf');
const bmiValue = require('./bmiValue')
const bot = new Telegraf(TOKEN);

const TEST_SCENE = new Scenes.WizardScene('TEST_SCENE',
    (ctx) => {
        ctx.reply('1. Please, enter your weight (kg): ')
        return ctx.wizard.next()
    },
    (ctx) => {
      ctx.wizard.state.weight = parseInt(ctx.message.text, 10);
      ctx.reply('2. Please, enter your height (cm): ')
      return ctx.wizard.next()
    },
    (ctx) => {
      ctx.wizard.state.height = parseInt(ctx.message.text, 10)/100;
      const weight = ctx.wizard.state.weight;
      const height = ctx.wizard.state.height
      const bmi = Math.floor(weight/height/height);

      ctx.reply(`Your BMI is ${bmi} - ${bmiValue(bmi)}`)
      setTimeout(()=> ctx.reply(`Try again - /start`), 1000)
      return ctx.scene.leave()
  }
)

const stage = new Scenes.Stage([TEST_SCENE])

bot.use(session());
bot.use(stage.middleware())


bot.start((ctx) => {
  ctx.scene.enter('TEST_SCENE')
})
bot.command('test',  (ctx) => {
  ctx.scene.enter('TEST_SCENE')
})


bot.launch()
  .then(res => console.log('started'))
  .catch(err => console.log(err))
