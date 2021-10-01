declare type ConsoleMessageAuthor = "System" | "Error" | "Commands";
declare const ConsoleColors: {
    Black: string;
    Red: string;
    Green: string;
    Yellow: string;
    Blue: string;
    Magenta: string;
    Cyan: string;
    White: string;
    NormalColor: string;
    DateColor: string;
    ErrorColor: string;
    SystemColor: string;
    CommandsColors: string;
    GetColor(Color: ConsoleMessageAuthor): string | undefined;
};
declare function ConsoleData(ConsoleMessageAuthorSelect?: ConsoleMessageAuthor, Data?: any, Text?: string): string | void;
declare function ConsoleBorder(Text: string | string[], SpaceNum?: number, Varbs?: any): null | undefined;
export { ConsoleColors, ConsoleData, ConsoleBorder, };
//# sourceMappingURL=Console.d.ts.map