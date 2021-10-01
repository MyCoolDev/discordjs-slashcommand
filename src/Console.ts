type ConsoleMessageAuthor = "System" | "Error" | "Commands";

function isInt(x: any) {
    return (x % 1 == 0);
}

const ConsoleColors = {
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
    GetColor(Color: ConsoleMessageAuthor): string | undefined {
        if (Color == "System") {
            return ConsoleColors.SystemColor;
        } else if (Color == "Error") {
            return ConsoleColors.ErrorColor;
        } else if (Color == "Commands") {
            return ConsoleColors.CommandsColors
        } else {
            return;
        }
    }
}

function ConsoleData(ConsoleMessageAuthorSelect?: ConsoleMessageAuthor, Data?: any, Text?: string): string | void {
    if (Text) {
        return ConsoleColors.DateColor + "[" + Text + "]" + ConsoleColors.NormalColor;
    } else if (ConsoleMessageAuthorSelect == undefined && !Data) {
        let date = new Date();
        const NowDate = ConsoleColors.DateColor + "[" + (String(date.getHours()).length > 1 ? String(date.getHours()) : String("0"+date.getHours())) + ":" + (String(date.getMinutes()).length > 1 ? String(date.getMinutes()) : String("0"+date.getMinutes())) + ":" + (String(date.getSeconds()).length > 1 ? String(date.getSeconds()) : String("0"+date.getSeconds())) + "]" + ConsoleColors.NormalColor;
        return NowDate;
    } else if (ConsoleMessageAuthorSelect != undefined && !Data) {
        let date = new Date();
        const NowDate = ConsoleColors.DateColor + "[" + (String(date.getHours()).length > 1 ? String(date.getHours()) : String("0"+date.getHours())) + ":" + (String(date.getMinutes()).length > 1 ? String(date.getMinutes()) : String("0"+date.getMinutes())) + ":" + (String(date.getSeconds()).length > 1 ? String(date.getSeconds()) : String("0"+date.getSeconds())) + "]" + ConsoleColors.NormalColor;
        const ConsoleMessageAuthorText = ConsoleColors.GetColor(ConsoleMessageAuthorSelect) + `[${ConsoleMessageAuthorSelect}]` + ConsoleColors.NormalColor;
        return NowDate + " " + ConsoleMessageAuthorText;
    } else if (ConsoleMessageAuthorSelect == undefined && Data) {
        let date = new Date();
        const NowDate = ConsoleColors.DateColor + "[" + (String(date.getHours()).length > 1 ? String(date.getHours()) : String("0"+date.getHours())) + ":" + (String(date.getMinutes()).length > 1 ? String(date.getMinutes()) : String("0"+date.getMinutes())) + ":" + (String(date.getSeconds()).length > 1 ? String(date.getSeconds()) : String("0"+date.getSeconds())) + "]" + ConsoleColors.NormalColor;
        console.log(NowDate, Data)
    } else if (ConsoleMessageAuthorSelect != undefined && Data) {
        let date = new Date();
        const NowDate = ConsoleColors.DateColor + "[" + (String(date.getHours()).length > 1 ? String(date.getHours()) : String("0"+date.getHours())) + ":" + (String(date.getMinutes()).length > 1 ? String(date.getMinutes()) : String("0"+date.getMinutes())) + ":" + (String(date.getSeconds()).length > 1 ? String(date.getSeconds()) : String("0"+date.getSeconds())) + "]" + ConsoleColors.NormalColor;
        const ConsoleMessageAuthorText = ConsoleColors.GetColor(ConsoleMessageAuthorSelect) + `[${ConsoleMessageAuthorSelect}]` + ConsoleColors.NormalColor;
        console.log(NowDate + " " + ConsoleMessageAuthorText, Data);
    }
}

function ConsoleBorder(Text: string | string[], SpaceNum: number=6, Varbs?: any) {
    let topLeftCorner = '\u256D'
    let topRightCorner = '\u256E'
    let btmRightCorner = '\u256F'
    let btmLeftCorner = '\u2570'
    let Borderbtm = '\u2500'
    let borderWarppepr = '\u2502'
    if (typeof Text == "string") {
        let InsideText = ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + Array(SpaceNum+1).join(" ") + Text + Array(SpaceNum+1).join(" ") + ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor;
        let TopBorder = ConsoleColors.Yellow + topLeftCorner + Array(((SpaceNum*2)+Text.length)+1).join(Borderbtm) + topRightCorner + ConsoleColors.NormalColor;
        let Space = ConsoleColors.Yellow + borderWarppepr + Array(((SpaceNum*2)+Text.length)+1).join(" ") + borderWarppepr + ConsoleColors.NormalColor;
        let ButtomBorder = ConsoleColors.Yellow + btmLeftCorner + Array(((SpaceNum*2)+Text.length)+1).join(Borderbtm) + btmRightCorner + ConsoleColors.NormalColor;
        console.log(
            TopBorder + "\n" +
            Space + "\n" +
            InsideText + "\n" +
            Space + "\n" +
            ButtomBorder
        )
    } else if (typeof Text == "object") {
        let InsideText = "";
        let TextWidth = 0;
        Text.forEach((_text, i) => {
            if (Varbs && Varbs[i]) {
                if (_text.length-Varbs[i] > TextWidth) {
                    TextWidth = _text.length-Varbs[i];
                }
            } else {
                if (_text.length > TextWidth) {
                    TextWidth = _text.length;
                }
            }
        })
        Text.forEach((_text, i) => {
            if (Varbs && Varbs[i]) {
                InsideText+=ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + Array((isInt((((TextWidth+(SpaceNum*2))-(_text.length-Varbs[i]))/2)+1) ? ((((TextWidth+(SpaceNum*2))-(_text.length-Varbs[i]))/2)+1) : Math.floor(((TextWidth+(SpaceNum*2))-(_text.length-Varbs[i]))/2)+2)).join(" ") + _text + Array(Math.floor((((TextWidth+(SpaceNum*2))-(_text.length-Varbs[i]))/2)+1)).join(" ") + ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + "\n"
            } else {
                InsideText+=ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + Array((isInt((((TextWidth+(SpaceNum*2))-_text.length)/2)+1) ? ((((TextWidth+(SpaceNum*2))-_text.length)/2)+1) : Math.floor(((TextWidth+(SpaceNum*2))-_text.length)/2)+2)).join(" ") + _text + Array(Math.floor((((TextWidth+(SpaceNum*2))-_text.length)/2)+1)).join(" ") + ConsoleColors.Yellow + borderWarppepr + ConsoleColors.NormalColor + "\n"
            }
        });
        let TopBorder = ConsoleColors.Yellow + topLeftCorner + Array(((SpaceNum*2)+TextWidth)+1).join(Borderbtm) + topRightCorner + ConsoleColors.NormalColor;
        let Space = ConsoleColors.Yellow + borderWarppepr + Array(((SpaceNum*2)+TextWidth)+1).join(" ") + borderWarppepr + ConsoleColors.NormalColor;
        let ButtomBorder = ConsoleColors.Yellow + btmLeftCorner + Array(((SpaceNum*2)+TextWidth)+1).join(Borderbtm) + btmRightCorner + ConsoleColors.NormalColor;
        console.log(
            TopBorder + "\n" +
            Space + "\n" +
            InsideText +
            Space + "\n" +
            ButtomBorder
        )
    } else {
        return null
    }
}

export {
    ConsoleColors,
    ConsoleData,
    ConsoleBorder,
}