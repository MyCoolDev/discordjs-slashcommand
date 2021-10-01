# Discordjs-SlashCommand
Discordjs-SlashCommand is a [npm](https://npmjs.com/) library. this library make slash command easer

## Installation
[![npm latest version](https://img.shields.io/npm/v/@semantic-release/npm/latest.svg)](https://www.npmjs.com/package/@semantic-release/npm)

```bash
npm install discordjs-slashcommands --save
```

### SelectMenu
 * [Basics](#Basics)
 * [ModuleOptions](#Options)

## Basics

```javascript
const Discord = require('discord.js');
const client = new DiscordJS.Client({
    intents: Object.values(Discord.Intents.FLAGS)
});
const package = require('../lib/index');
const builder = new package.CommandBuilder(client);

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
    });
})

client.login('TOKEN_HERE')
```

## Options
### `CommandBuilder` 
 * `@parms` `client`
 *  `@typeof {client}` `<discord.js>.Client` 
### `CommandBuilder/__client__`
 * `@type` `<discord.js>.Client`
 * the client that `CommandBuilder` using.
### `CommandBuilder/__Commands__`
 *  `@type` `Map<string, BuildData>`
 *  the commands that `CommandBuilder` using.
### `CommandBuilder/__ComponentDir__`
 * `@type` `string`
 *  the `Components` folder that `CommandBuilder` using
 * **default** - `null`
### `CommandBuilder/setComponent`
 * `@parms` `path`
 * `@typeof {path}` `string`
 * The folder should look like this:
    ```bash
    __dirname
    ├───Buttons
    │    ├───ButtonCustomId.js/ts
    │    └───...
    └───SelectMenu
         ├───SelectMenuCustomId.js/ts
         └───...
      ```
 * **If component message is from interaction you don't need to create a file in this folder you can use the function in the build function him self**
### `CommandBuilder/build`
 * `@parms` `Data`
 * `typeof {Data}` `BuildData[]`
 * Build the slash command/s.
### `CommandBuilder/run`
 * Runing the slash command/s.
### `CommandBuilder/reset`
 * removing all global client slash commands.
### `CommandBuilder/remove`
 * `@parms` `global`
 * `@typeof {global}` `boolean`
 * `@parms` `guildId`
 * `@typeof {guildId}` `<discord.js>.Snowflake`
 * `@parms` `CommandName`
 * `@typeof {CommandName}` `string`


## License
[MIT](https://choosealicense.com/licenses/mit/)