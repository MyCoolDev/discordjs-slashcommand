"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuilder = void 0;
var fs_1 = __importDefault(require("fs"));
var _Console = __importStar(require("./Console"));
var CommandBuilder = /** @class */ (function () {
    function CommandBuilder(client) {
        this.__Commands__ = new Map();
        this.__ComponentDir__ = '';
        this.__client__ = client;
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
    CommandBuilder.prototype.setComponent = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!fs_1.default.existsSync(path) && fs_1.default.statSync(path).isDirectory()) {
                    throw _Console.ConsoleColors.Red + _Console.ConsoleData.apply(_Console, __spreadArray(__spreadArray([], Array(2), false), ['Error'], false)) + _Console.ConsoleColors.NormalColor + " This path is incorrect or does not lead to a folder.";
                }
                else {
                    this.__ComponentDir__ = path;
                }
                return [2 /*return*/];
            });
        });
    };
    CommandBuilder.prototype.isExistsCommand = function (data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var commands;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(data.guildId && data.global == false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_a = this.__client__.guilds.cache.get(data.guildId)) === null || _a === void 0 ? void 0 : _a.commands.fetch())];
                    case 1:
                        commands = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ((_b = this.__client__.application) === null || _b === void 0 ? void 0 : _b.commands.fetch())];
                    case 3:
                        commands = _c.sent();
                        _c.label = 4;
                    case 4:
                        if ((commands === null || commands === void 0 ? void 0 : commands.find(function (item) { return item.name == data.command.name; })) == undefined)
                            return [2 /*return*/, false];
                        else
                            return [2 /*return*/, true];
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandBuilder.prototype.CheckInteraction = function (interaction) {
        var _a, _b, _c, _d;
        try {
            if (interaction.member.pending == true)
                return interaction.reply("You have to passed the guild's Membership Screening");
            if (interaction.isCommand() || interaction.isContextMenu()) {
                if (!this.__Commands__.has(interaction.commandName))
                    return;
                (_a = this.__Commands__.get(interaction.commandName)) === null || _a === void 0 ? void 0 : _a.commandResponse.CommandExec(interaction);
            }
            else if (interaction.isButton()) {
                if (!((_b = interaction.message.interaction) === null || _b === void 0 ? void 0 : _b.commandName)) {
                    if (!fs_1.default.existsSync(this.__ComponentDir__ + "/Buttons/" + interaction.customId + ".js") || fs_1.default.existsSync(this.__ComponentDir__ + "/Buttons/" + interaction.customId + ".ts"))
                        throw _Console.ConsoleColors.Red + _Console.ConsoleData.apply(_Console, __spreadArray(__spreadArray([], Array(2), false), ['Error'], false)) + _Console.ConsoleColors.NormalColor + " There is no file with the name '" + interaction.customId + "' in '" + this.__ComponentDir__ + "/Buttons', Please check it out";
                    else
                        require(this.__ComponentDir__ + "/Buttons/" + interaction.customId + ".js")(interaction);
                }
                else if (!this.__Commands__.has(interaction.message.interaction.commandName))
                    return;
                else {
                    if (!((_c = this.__Commands__.get(interaction.message.interaction.commandName)) === null || _c === void 0 ? void 0 : _c.commandResponse.ButtonExec))
                        throw _Console.ConsoleColors.Red + _Console.ConsoleData.apply(_Console, __spreadArray(__spreadArray([], Array(2), false), ['Error'], false)) + _Console.ConsoleColors.NormalColor + " You missed the 'ButtonExec' callback parameter.";
                    else {
                        this.__Commands__.get(interaction.message.interaction.commandName).commandResponse.ButtonExec();
                    }
                }
            }
            else if (interaction.isSelectMenu()) {
                if (!interaction.customId.includes('_')) {
                    if (!fs_1.default.existsSync(this.__ComponentDir__ + "/SelectMenu/" + interaction.customId + ".js") || fs_1.default.existsSync(this.__ComponentDir__ + "/SelectMenu/" + interaction.customId + ".ts"))
                        throw _Console.ConsoleColors.Red + _Console.ConsoleData.apply(_Console, __spreadArray(__spreadArray([], Array(2), false), ['Error'], false)) + _Console.ConsoleColors.NormalColor + " There is no file with the name '" + interaction.customId + "' in '" + this.__ComponentDir__ + "/SelectMenu', Please check it out";
                    else
                        require(this.__ComponentDir__ + "/SelectMenu/" + interaction.customId + ".js")(interaction);
                }
                if (!this.__Commands__.has(interaction.customId.split("_").slice(1)[0]))
                    return;
                if (!((_d = this.__Commands__.get(interaction.customId.split("_").slice(1)[0])) === null || _d === void 0 ? void 0 : _d.commandResponse.MenuExec))
                    throw _Console.ConsoleColors.Red + _Console.ConsoleData.apply(_Console, __spreadArray(__spreadArray([], Array(2), false), ['Error'], false)) + _Console.ConsoleColors.NormalColor + " You missed the 'MenuExec' callback parameter.";
                this.__Commands__.get(interaction.customId.split("_").slice(1)[0]).commandResponse.MenuExec(interaction);
            }
        }
        catch (err) {
            console.log(_Console.ConsoleData('Error'), err);
        }
    };
    /**
     * Build the slash command/s.
     * @param Data Build Data.
     */
    CommandBuilder.prototype.build = function (Data) {
        var _this = this;
        if (this.__client__.isReady() == false) {
            throw _Console.ConsoleColors.Red + _Console.ConsoleData.apply(_Console, __spreadArray(__spreadArray([], Array(2), false), ['Error'], false)) + _Console.ConsoleColors.NormalColor + " The client is not ready yet, Please replace the build method to an ready event callback." + _Console.ConsoleColors.NormalColor;
        }
        try {
            var AppCommands;
            _Console.ConsoleBorder(["\uD83C\uDF87 " + _Console.ConsoleColors.Yellow + "Starting SlashCommandBuilder" + _Console.ConsoleColors.NormalColor + " \uD83C\uDF87", "Version: " + _Console.ConsoleColors.Cyan + process.env.npm_package_version + _Console.ConsoleColors.NormalColor], 10, { 0: _Console.ConsoleColors.Yellow.length + _Console.ConsoleColors.NormalColor.length, 1: _Console.ConsoleColors.Cyan.length + _Console.ConsoleColors.NormalColor.length });
            Data.forEach(function (_data, _index) { return __awaiter(_this, void 0, void 0, function () {
                var err_1;
                var _this = this;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            if (!_data.command || !_data.commandResponse.CommandExec)
                                throw _Console.ConsoleColors.Red + _Console.ConsoleData.apply(_Console, __spreadArray(__spreadArray([], Array(2), false), ['Error'], false)) + _Console.ConsoleColors.NormalColor + " You missed the 'Command' or 'CommandExec' parameter.";
                            if (!_data.global || _data.global == true) {
                                AppCommands = (_a = this.__client__.application) === null || _a === void 0 ? void 0 : _a.commands;
                            }
                            else if (_data.guildId) {
                                AppCommands = (_b = this.__client__.guilds.cache.get(_data.guildId)) === null || _b === void 0 ? void 0 : _b.commands;
                            }
                            return [4 /*yield*/, this.isExistsCommand(_data).then(function (isExists) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        if (isExists == true) {
                                            console.log(_Console.ConsoleData("Commands"), "Loading (/) Command: " + _data.command.name);
                                            this.__Commands__.set(_data.command.name, _data);
                                        }
                                        else {
                                            AppCommands === null || AppCommands === void 0 ? void 0 : AppCommands.create(_data.command).then(function (CreatedCommand) { return __awaiter(_this, void 0, void 0, function () {
                                                var permissions;
                                                return __generator(this, function (_a) {
                                                    console.log(_Console.ConsoleData("Commands"), "Creating New (/) Command: " + CreatedCommand.name);
                                                    this.__Commands__.set(CreatedCommand.name, _data);
                                                    if (_data.permissions && _data.command.defaultPermission == false) {
                                                        permissions = _data.permissions;
                                                        CreatedCommand.permissions.add({ permissions: permissions });
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                        }
                                        return [2 /*return*/];
                                    });
                                }); })];
                        case 1:
                            _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _c.sent();
                            console.log(_Console.ConsoleData("Error"), err_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return {
                then: function (callback) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, callback()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                }
            };
        }
        catch (Err) {
            _Console.ConsoleData('Error', Err);
        }
    };
    ;
    /**
     * Runing the slash command/s.
     */
    CommandBuilder.prototype.run = function () {
        var _this = this;
        this.__client__.on("interactionCreate", function (interaction) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.CheckInteraction(interaction);
                return [2 /*return*/];
            });
        }); });
        return {
            then: function (callback) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        };
    };
    /**
     * removing all global client slash commands.
     */
    CommandBuilder.prototype.reset = function () {
        var _this = this;
        var _a;
        try {
            console.log(_Console.ConsoleData("Commands"), "Removes all command...");
            (_a = this.__client__.application) === null || _a === void 0 ? void 0 : _a.commands.fetch().then(function (_commands) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _commands.forEach(function (command) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, command.delete()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            console.log(_Console.ConsoleData("Commands"), "Command Successfully Delete!");
        }
        return {
            then: function (callback) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        };
    };
    /**
     *
     * @param global 'true' if the command/s be global.
     * @param guildId The guild id of the guild where the commands will be, **If the commands are global there is no need for this parameter.**
     * @param CommandName The name of the slash command.
     */
    CommandBuilder.prototype.remove = function (global, guildId, CommandName) {
        var _this = this;
        var _a, _b;
        try {
            console.log(_Console.ConsoleData("Commands"), "Removes '" + CommandName + "' command...");
            if (global == true)
                (_a = this.__client__.application) === null || _a === void 0 ? void 0 : _a.commands.fetch().then(function (_commands) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, _commands.filter(function (_) { return _.name == CommandName; }).forEach(function (command) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, command.delete()];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
            else
                (_b = this.__client__.guilds.cache.get(guildId)) === null || _b === void 0 ? void 0 : _b.commands.fetch().then(function (_commands) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, _commands.filter(function (_) { return _.name == CommandName; }).forEach(function (command) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, command.delete()];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            console.log(_Console.ConsoleData("Commands"), "Command Successfully Delete!");
        }
        return {
            then: function (callback) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        };
    };
    return CommandBuilder;
}());
exports.CommandBuilder = CommandBuilder;
//# sourceMappingURL=index.js.map