import DiscordJS, { Snowflake, ApplicationCommandOptionChoice, ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, ButtonInteraction, SelectMenuInteraction } from "discord.js";
declare type ApplicationCommandOptionDate = {
    type: ApplicationCommandOptionType | number;
    name: string;
    description: string;
    required: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOptionDate[];
};
interface CommandData {
    name: string;
    description?: string;
    type?: ApplicationCommandType | number;
    options?: ApplicationCommandOptionDate[];
    defaultPermission?: boolean;
}
interface BuildDataCommandResponseOptionData {
    /**
     * Will run when the slash command been used.
     * @param interaction Slash command data.
     */
    CommandExec(interaction: CommandInteraction): void;
    /**
     * Will run when the slash command button been used.
     * @param interaction Slash command button data.
     */
    ButtonExec?(interaction: ButtonInteraction): void;
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
    MenuExec?(interaction: SelectMenuInteraction): void;
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
export declare class CommandBuilder {
    __client__: DiscordJS.Client;
    __Commands__: Map<string, BuildData>;
    __ComponentDir__: string;
    constructor(client: DiscordJS.Client);
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
    setComponent(path: string): Promise<void>;
    private isExistsCommand;
    private CheckInteraction;
    /**
     * Build the slash command/s.
     * @param Data Build Data.
     */
    build(Data: BuildData[]): {
        then(callback: () => void): Promise<void>;
    } | undefined;
    /**
     * Runing the slash command/s.
     */
    run(): {
        then(callback: () => void): Promise<void>;
    };
    /**
     * removing all global client slash commands.
     */
    reset(): {
        then(callback: () => void): Promise<void>;
    };
    /**
     *
     * @param global 'true' if the command/s be global.
     * @param guildId The guild id of the guild where the commands will be, **If the commands are global there is no need for this parameter.**
     * @param CommandName The name of the slash command.
     */
    remove(global: boolean, guildId: Snowflake, CommandName: string): {
        then(callback: () => void): Promise<void>;
    };
}
export {};
//# sourceMappingURL=index.d.ts.map