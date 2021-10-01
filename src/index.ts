import DiscordJS, { Snowflake, ApplicationCommandOptionChoice, ApplicationCommandOptionType, ApplicationCommandType, UserApplicationCommandData, CommandInteraction, ButtonInteraction, SelectMenuInteraction, ApplicationCommand} from "discord.js";
import fs from 'fs';
import path from 'path';
import * as _Console from './Console'

type ApplicationCommandOptionDate = {
    type: ApplicationCommandOptionType | number,
    name: string,
    description: string,
    required: boolean,
    choices?: ApplicationCommandOptionChoice[],
    options?: ApplicationCommandOptionDate[]
}

interface CommandData {
    name: string,
    description?: string,
    type?: ApplicationCommandType | number,
    options?: ApplicationCommandOptionDate[],
    defaultPermission?: boolean
}

interface BuildDataCommandResponseOptionData {
    /**
     * Will run when the slash command been used.
     * @param interaction Slash command data.
     */
    CommandExec(interaction: CommandInteraction): void,
    /**
     * Will run when the slash command button been used.
     * @param interaction Slash command button data.
     */
    ButtonExec?(interaction: ButtonInteraction): void,
    /**
     * Will run when the slash command menu been used.
     * **SelectMenu must have commandName in customId**
     * @example
     * const SelectMenu = new MessageSelectMenu()
     * 
     * .setCustomId(`select_${COMMAND_NAME_HERE}`)
     * .setPlaceholder('Nothing selected')
     * .addOptions([
     *     {
     *         label: 'Select me',
     *         description: 'This is a description',
     *         value: 'first_option',
     *     },
     *     {
     *         label: 'You can select me too',
     *         description: 'This is also a description',
     *         value: 'second_option',
     *     },
     * ]),
     * @param interaction Slash command menu data.
     */
    MenuExec?(interaction: SelectMenuInteraction): void
}

interface BuildData {
    /**
     * functions that will response the command or linked commands.
     */
    commandResponse: BuildDataCommandResponseOptionData;
    /**
     * 'true' if you wanna your command/s be global.                   
     *  **Default: true**
     */
    global?: boolean;
    /**
     * The guild id of the guild where the commands will be,             
     * **If the commands are global there is no need for this parameter.**
     */
    guildId?: Snowflake;
    /**
     * The slash command data. This data will add to the client application commands.
     */
    command: CommandData;
    /**
     * Slash command permission. This data can be change, see more in:
     * @see https://discordjs.guide/interactions/slash-command-permissions.html
     */
    permissions?: DiscordJS.ApplicationCommandPermissionData[];
}

interface TableObject {
    name: string,
    Status: "✅" | "❌"
}

export class CommandBuilder {
    public __client__: DiscordJS.Client;
    public __Commands__: Map<string, BuildData> = new Map();
    public __ComponentDir__: string = '';
    constructor(client: DiscordJS.Client) {
        this.__client__ = client
    }

    /**
     * The folder should look like this:
     * ```cmd
     * ├───Buttons
     * │   ├───ButtonCustomId.js/ts
     * │   └───...
     * └───SelectMenu
     *     ├───SelectMenuCustomId.js/ts
     *     └───...
     * ```
     * If component message is from interaction you don't need to create a file in this folder you can use the function in the build function him self
     * @param path The path to the component folder like: './' or 'c:/'
     */
    public async setComponent(path: string) {
        if (!fs.existsSync(path) && fs.statSync(path).isDirectory()) {
            throw `${_Console.ConsoleColors.Red+_Console.ConsoleData(...Array(2), 'Error')+_Console.ConsoleColors.NormalColor} This path is incorrect or does not lead to a folder.`
        } else {
            this.__ComponentDir__ = path;
        }
    }

    private async isExistsCommand(data: BuildData) {
        let commands;
        if (data.guildId && data.global == false) {
            commands = await this.__client__.guilds.cache.get(data.guildId)?.commands.fetch();
        } else {
            commands = await this.__client__.application?.commands.fetch();
        }
        if (commands?.find(item => item.name == data.command.name) == undefined) return false;
        else return true
    }

    private CheckInteraction(interaction: any) {
        try {
            if (interaction.member.pending == true) return interaction.reply(`You have to passed the guild's Membership Screening`)
            if (interaction.isCommand() || interaction.isContextMenu()) {
                if (!this.__Commands__.has(interaction.commandName)) return;
                this.__Commands__.get(interaction.commandName)?.commandResponse.CommandExec(interaction);
            } else if (interaction.isButton()) {
                if (!interaction.message.interaction?.commandName) {
                    if (!fs.existsSync(`${this.__ComponentDir__}/Buttons/${interaction.customId}.js`) || fs.existsSync(`${this.__ComponentDir__}/Buttons/${interaction.customId}.ts`)) throw `${_Console.ConsoleColors.Red+_Console.ConsoleData(...Array(2), 'Error')+_Console.ConsoleColors.NormalColor} There is no file with the name '${interaction.customId}' in '${this.__ComponentDir__}/Buttons', Please check it out`;
                    else require(`${this.__ComponentDir__}/Buttons/${interaction.customId}.js`)(interaction);
                } else if (!this.__Commands__.has(interaction.message.interaction.commandName)) return;
                else {
                    if (!this.__Commands__.get(interaction.message.interaction.commandName)?.commandResponse.ButtonExec) throw `${_Console.ConsoleColors.Red+_Console.ConsoleData(...Array(2), 'Error')+_Console.ConsoleColors.NormalColor} You missed the 'ButtonExec' callback parameter.`;
                    else {
                        (this.__Commands__.get(interaction.message.interaction.commandName)as any).commandResponse.ButtonExec();
                    }
                }
            } else if (interaction.isSelectMenu()) {
                if (!interaction.customId.includes('_')) {
                    if (!fs.existsSync(`${this.__ComponentDir__}/SelectMenu/${interaction.customId}.js`) || fs.existsSync(`${this.__ComponentDir__}/SelectMenu/${interaction.customId}.ts`)) throw `${_Console.ConsoleColors.Red+_Console.ConsoleData(...Array(2), 'Error')+_Console.ConsoleColors.NormalColor} There is no file with the name '${interaction.customId}' in '${this.__ComponentDir__}/SelectMenu', Please check it out`;
                    else require(`${this.__ComponentDir__}/SelectMenu/${interaction.customId}.js`)(interaction);
                }
                if (!this.__Commands__.has(interaction.customId.split("_").slice(1)[0])) return;
                if (!this.__Commands__.get(interaction.customId.split("_").slice(1)[0])?.commandResponse.MenuExec) throw `${_Console.ConsoleColors.Red+_Console.ConsoleData(...Array(2), 'Error')+_Console.ConsoleColors.NormalColor} You missed the 'MenuExec' callback parameter.`;
                (this.__Commands__.get(interaction.customId.split("_").slice(1)[0])as any).commandResponse.MenuExec(interaction);
            }
        } catch (err) {
            console.log(_Console.ConsoleData('Error'), err);
        }
    }

    /**
     * Build the slash command/s.
     * @param Data Build Data.
     */
    public build(Data: BuildData[]) {
        if (this.__client__.isReady() == false) {
            throw `${_Console.ConsoleColors.Red+_Console.ConsoleData(...Array(2), 'Error')+_Console.ConsoleColors.NormalColor} The client is not ready yet, Please replace the build method to an ready event callback.${_Console.ConsoleColors.NormalColor}`
        }

        try {
            var AppCommands: DiscordJS.ApplicationCommandManager<DiscordJS.ApplicationCommand<{    guild: DiscordJS.GuildResolvable;}>, {    guild: DiscordJS.GuildResolvable;}, null> | DiscordJS.GuildApplicationCommandManager | undefined;
            _Console.ConsoleBorder([`🎇 ${_Console.ConsoleColors.Yellow}Starting SlashCommandBuilder${_Console.ConsoleColors.NormalColor} 🎇`, `Version: ${_Console.ConsoleColors.Cyan}${process.env.npm_package_version}${_Console.ConsoleColors.NormalColor}`], 10, {0:_Console.ConsoleColors.Yellow.length+_Console.ConsoleColors.NormalColor.length, 1:_Console.ConsoleColors.Cyan.length+_Console.ConsoleColors.NormalColor.length})
            Data.forEach(async (_data: BuildData, _index: number) => {
                try {
                    if (!_data.command || !_data.commandResponse.CommandExec) throw `${_Console.ConsoleColors.Red+_Console.ConsoleData(...Array(2), 'Error')+_Console.ConsoleColors.NormalColor} You missed the 'Command' or 'CommandExec' parameter.`;
                    if (!_data.global || _data.global == true) {
                        AppCommands = this.__client__.application?.commands;
                    } else if (_data.guildId) {
                        AppCommands = this.__client__.guilds.cache.get(_data.guildId)?.commands;
                    }
                    await this.isExistsCommand(_data).then(async (isExists: Boolean) => {
                        if (isExists == true) {
                            console.log(_Console.ConsoleData("Commands"), `Loading (/) Command: ${_data.command.name}`);
                            this.__Commands__.set(_data.command.name, _data);
                        } else {
                            AppCommands?.create(_data.command as any).then(async (CreatedCommand) => {
                                console.log(_Console.ConsoleData("Commands"), `Creating New (/) Command: ${CreatedCommand.name}`)
                                this.__Commands__.set(CreatedCommand.name, _data);
                                if (_data.permissions && _data.command.defaultPermission == false) {
                                    let permissions = _data.permissions
                                    CreatedCommand.permissions.add({ permissions: permissions });
                                }
                            })
                        }
                    })
                } catch (err) {
                    console.log(_Console.ConsoleData("Error"), err);
                }
            })
            return {
                async then(callback: () => void): Promise<void> {
                    await callback()
                }
            };
        } catch (Err) {
            _Console.ConsoleData('Error', Err);
        }
    };

    /**
     * Runing the slash command/s.
     */
    public run() {
        this.__client__.on("interactionCreate", async (interaction) => {
            this.CheckInteraction(interaction);
        })
        return {
            async then(callback: () => void): Promise<void> {
                await callback()
            }
        }
    }

    /**
     * removing all global client slash commands.
     */
    public reset() {
        try {
            console.log(_Console.ConsoleData("Commands"), "Removes all command...");
            this.__client__.application?.commands.fetch().then(async _commands => await _commands.forEach(async command => await command.delete()));
        } catch (error) {
            console.log(error)
        } finally {
            console.log(_Console.ConsoleData("Commands"), "Command Successfully Delete!");
        }
        return {
            async then(callback: () => void): Promise<void> {
                await callback()
            }
        }
    }

    /**
     * 
     * @param global 'true' if the command/s be global.
     * @param guildId The guild id of the guild where the commands will be, **If the commands are global there is no need for this parameter.**
     * @param CommandName The name of the slash command.
     */
    public remove(global: boolean, guildId: Snowflake, CommandName: string) {
        try {
            console.log(_Console.ConsoleData("Commands"), "Removes '"+CommandName+"' command...");
            if (global == true) this.__client__.application?.commands.fetch().then(async _commands => await _commands.filter(_ => _.name == CommandName).forEach(async command => await command.delete()));
            else this.__client__.guilds.cache.get(guildId)?.commands.fetch().then(async _commands => await _commands.filter(_ => _.name == CommandName).forEach(async command => await command.delete()));
        } catch (error) {
            console.log(error)
        } finally {
            console.log(_Console.ConsoleData("Commands"), "Command Successfully Delete!");
        }
        return {
            async then(callback: () => void): Promise<void> {
                await callback()
            }
        }
    }
}