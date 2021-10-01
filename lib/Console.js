"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleBorder = exports.ConsoleData = exports.ConsoleColors = void 0;
function isInt(x) {
    return (x % 1 == 0);
}
var ConsoleColors = {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
    NormalColor: "\x1b[m",
    DateColor: "\x1b[33m",
    ErrorColor: "\x1b[31m",
    SystemColor: "\x1b[33m",
    CommandsColors: "\x1b[34m",
    GetColor: function (Color) {
        if (Color == "System") {
            return ConsoleColors.SystemColor;
        }
        else if (Color == "Error") {
            return ConsoleColors.ErrorColor;
        }
        else if (Color == "Commands") {
            return ConsoleColors.CommandsColors;
        }
        else {
            return;
        }
    }
};
exports.ConsoleColors = ConsoleColors;
function ConsoleData(ConsoleMessageAuthorSelect, Data, Text) {
    if (Text) {
        return ConsoleColors.DateColor + "[" + Text + "]" + ConsoleColors.NormalColor;
    }
    else if (ConsoleMessageAuthorSelect == undefined && !Data) {
        var date = new Date();
        var NowDate = ConsoleColors.DateColor + "[" + (String(date.getHours()).length > 1 ? String(date.getHours()) : String("0" + date.getHours())) + ":" + (String(date.getMinutes()).length > 1 ? String(date.getMinutes()) : String("0" + date.getMinutes())) + ":" + (String(date.getSeconds()).length > 1 ? String(date.getSeconds()) : String("0" + date.getSeconds())) + "]" + ConsoleColors.NormalColor;
        return NowDate;
    }
    else if (ConsoleMessageAuthorSelect != undefined && !Data) {
        var date = new Date();
        var NowDate = ConsoleColors.DateColor + "[" + (String(date.getHours()).length > 1 ? String(date.getHours()) : String("0" + date.getHours())) + ":" + (String(date.getMinutes()).length > 1 ? String(date.getMinutes()) : String("0" + date.getMinutes())) + ":" + (String(date.getSeconds()).length > 1 ? String(date.getSeconds()) : String("0" + date.getSeconds())) + "]" + ConsoleColors.NormalColor;
        var ConsoleMessageAuthorText = ConsoleColors.GetColor(ConsoleMessageAuthorSelect) + ("[" + ConsoleMessageAuthorSelect + "]") + ConsoleColors.NormalColor;
        return NowDate + " " + ConsoleMessageAuthorText;
    }
    else if (ConsoleMessageAuthorSelect == undefined && Data) {
        var date = new Date();
        var NowDate = ConsoleColors.DateColor + "[" + (String(date.getHours()).length > 1 ? String(date.getHours()) : String("0" + date.getHours())) + ":" + (String(date.getMinutes()).length > 1 ? String(date.getMinutes()) : String("0" + date.getMinutes())) + ":" + (String(date.getSeconds()).length > 1 ? String(date.getSeconds()) : String("0" + date.getSeconds())) + "]" + ConsoleColors.NormalColor;
        console.log(NowDate, Data);
    }
    else if (ConsoleMessageAuthorSelect != undefined && Data) {
        var date = new Date();
        var NowDate = ConsoleColors.DateColor + "[" + (String(date.getHours()).length > 1 ? String(date.getHours()) : String("0" + date.getHours())) + ":" + (String(date.getMinutes()).length > 1 ? String(date.getMinutes()) : String("0" + date.getMinutes())) + ":" + (String(date.getSeconds()).length > 1 ? String(date.getSeconds()) : String("0" + date.getSeconds())) + "]" + ConsoleColors.NormalColor;
        var ConsoleMessageAuthorText = ConsoleColors.GetColor(ConsoleMessageAuthorSelect) + ("[" + ConsoleMessageAuthorSelect + "]") + ConsoleColors.NormalColor;
        console.log(NowDate + " " + ConsoleMessageAuthorText, Data);
    }
}
exports.ConsoleData = ConsoleData;
function ConsoleBorder(Text, SpaceNum, Varbs) {
    if (SpaceNum === void 0) { SpaceNum = 6; }
    var topLeftCorner = '\u256D';
    var topRightCorner = '\u256E';
    var btmRightCorner = '\u256F';
    var btmLeftCorner = '\u2570';
    var Borderbtm = '\u2500';
    var borderWarppepr = '\u2502';
    if (typeof Text == "string") {
        var InsideText = ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + Array(SpaceNum + 1).join(" ") + Text + Array(SpaceNum + 1).join(" ") + ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor;
        var TopBorder = ConsoleColors.Yellow + topLeftCorner + Array(((SpaceNum * 2) + Text.length) + 1).join(Borderbtm) + topRightCorner + ConsoleColors.NormalColor;
        var Space = ConsoleColors.Yellow + borderWarppepr + Array(((SpaceNum * 2) + Text.length) + 1).join(" ") + borderWarppepr + ConsoleColors.NormalColor;
        var ButtomBorder = ConsoleColors.Yellow + btmLeftCorner + Array(((SpaceNum * 2) + Text.length) + 1).join(Borderbtm) + btmRightCorner + ConsoleColors.NormalColor;
        console.log(TopBorder + "\n" +
            Space + "\n" +
            InsideText + "\n" +
            Space + "\n" +
            ButtomBorder);
    }
    else if (typeof Text == "object") {
        var InsideText_1 = "";
        var TextWidth_1 = 0;
        Text.forEach(function (_text, i) {
            if (Varbs && Varbs[i]) {
                if (_text.length - Varbs[i] > TextWidth_1) {
                    TextWidth_1 = _text.length - Varbs[i];
                }
            }
            else {
                if (_text.length > TextWidth_1) {
                    TextWidth_1 = _text.length;
                }
            }
        });
        Text.forEach(function (_text, i) {
            if (Varbs && Varbs[i]) {
                InsideText_1 += ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + Array((isInt((((TextWidth_1 + (SpaceNum * 2)) - (_text.length - Varbs[i])) / 2) + 1) ? ((((TextWidth_1 + (SpaceNum * 2)) - (_text.length - Varbs[i])) / 2) + 1) : Math.floor(((TextWidth_1 + (SpaceNum * 2)) - (_text.length - Varbs[i])) / 2) + 2)).join(" ") + _text + Array(Math.floor((((TextWidth_1 + (SpaceNum * 2)) - (_text.length - Varbs[i])) / 2) + 1)).join(" ") + ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + "\n";
            }
            else {
                InsideText_1 += ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + Array((isInt((((TextWidth_1 + (SpaceNum * 2)) - _text.length) / 2) + 1) ? ((((TextWidth_1 + (SpaceNum * 2)) - _text.length) / 2) + 1) : Math.floor(((TextWidth_1 + (SpaceNum * 2)) - _text.length) / 2) + 2)).join(" ") + _text + Array(Math.floor((((TextWidth_1 + (SpaceNum * 2)) - _text.length) / 2) + 1)).join(" ") + ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + "\n";
            }
        });
        var TopBorder = ConsoleColors.Yellow + topLeftCorner + Array(((SpaceNum * 2) + TextWidth_1) + 1).join(Borderbtm) + topRightCorner + ConsoleColors.NormalColor;
        var Space = ConsoleColors.Yellow + borderWarppepr + Array(((SpaceNum * 2) + TextWidth_1) + 1).join(" ") + borderWarppepr + ConsoleColors.NormalColor;
        var ButtomBorder = ConsoleColors.Yellow + btmLeftCorner + Array(((SpaceNum * 2) + TextWidth_1) + 1).join(Borderbtm) + btmRightCorner + ConsoleColors.NormalColor;
        console.log(TopBorder + "\n" +
            Space + "\n" +
            InsideText_1 +
            Space + "\n" +
            ButtomBorder);
    }
    else {
        return null;
    }
}
exports.ConsoleBorder = ConsoleBorder;
//# sourceMappingURL=Console.js.map