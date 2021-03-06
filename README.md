# Discordjs-SlashCommand
Discordjs-SlashCommand is a [npm](https://npmjs.com/) library. this library makes slash command easier

## Installation
```bash
npm install @mycool/discordjs-slashcommands --save
```

## Usage

```javascript
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: Object.values(Discord.Intents.FLAGS)
});
const package = require('@mycool/discordjs-slashcommands');
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
