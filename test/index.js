const DiscordJS = require('discord.js');
const client = new DiscordJS.Client({
    intents: Object.values(DiscordJS.Intents.FLAGS)
})
const CommandBuilderPackage = require('../lib/index');
const builder = new CommandBuilderPackage.CommandBuilder(client)

client.once('ready', () => {
    console.log('The bot is ready')
    builder.build([
        {
            global: true,
            command: {
                type: 'CHAT_INPUT',
                name: 'test',
                description: 'testing the package.',
            },
            commandResponse: {
                async CommandExec(interaction) {
                    interaction.reply({
                        content: 'test',
                        ephemeral: true
                    })
                }
            },
        }
    ]).then(() => {
        builder.run();
    })
})

client.login('TOKEN_HERE')