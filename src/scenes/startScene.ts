import { Composer, Markup, Scenes } from 'telegraf'

const groups = [
    { id: 1, name: 'HHG', semster: 2 },
    { id: 2, name: 'QQW', semster: 4 },
    { id: 3, name: 'WWE', semster: 3 },
    { id: 4, name: 'RRT', semster: 2},
    { id: 5, name: 'HHG', semster: 2 },
    { id: 6, name: 'QQW', semster: 4 },
    { id: 7, name: 'WWE', semster: 3 },
    { id: 8, name: 'RRT', semster: 2},
    { id: 9, name: 'HHG', semster: 2 },
    { id: 10, name: 'QQW', semster: 4 },
    { id: 11, name: 'WWE', semster: 3 },
    { id: 12, name: 'RRT', semster: 2},
]

const firstStep = new Composer<Scenes.WizardContext>()
firstStep.on('text', async ctx => {
    ctx.scene.state = {}
    await ctx.reply('But first you can help me. Type me your first and last name. \nexample: Ivan Ivanov')
    return ctx.wizard.next()
})

const firstLastName = new Composer<Scenes.WizardContext>()
firstLastName.on('text', async ctx => {
    const [ firstName, lastName ] = ctx.message.text.split(' ')
    ctx.scene.state = { firstName, lastName }

    const buttons = 
        groups.map(group => {
            return Markup.button.callback(group.name, `followgroup-${group.id}`)
        })

    await ctx.reply(`
Perfect! Nice to meet ${firstName} ${lastName} 
How do you follow group?
`, Markup.inlineKeyboard([...buttons], { columns: 3 }))

    return ctx.wizard.next()
})

const choiseGroupStep = new Composer<Scenes.WizardContext>()
const buttons = 
        groups.map(group => {
            return Markup.button.callback(group.name, `followgroup-${group.id}`)
        })
choiseGroupStep.on('text', ctx => {
    ctx.reply('Please. Choise the group', Markup.inlineKeyboard([...buttons], { columns: 3 }))
    console.log(ctx.scene.state)
})
choiseGroupStep.action(/followgroup-.+/g, async ctx => {
    await ctx.answerCbQuery()

    const [_action, groupId] = ctx.match.input.split('-')
    await ctx.deleteMessage(ctx.callbackQuery.message?.message_id)
    await ctx.reply(`Good! You choise ${groupId}`)
    ctx.scene.state = { ...ctx.scene.state, groupId }

    ctx.scene.leave()
})

export default new Scenes.WizardScene(
    'startScene',
    firstStep,
    firstLastName,
    choiseGroupStep
)