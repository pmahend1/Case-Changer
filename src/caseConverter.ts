import { TextCaseKind } from "./textCaseKind";

export class CaseConverter {

    public changeCase(text: string, caseKind: TextCaseKind): string {
        if (text.length === 0) {
            throw Error("Please select a non-empty text to change case!");
        }
        let splitter: string | RegExp = /[\W\s]+/;
        let shouldBeLowerFirstChar = false;
        let isSnakeKebab = false;
        switch (caseKind) {
            case TextCaseKind.Uppercase:
                return text.toUpperCase();
            case TextCaseKind.LowerCase:
                return text.toLowerCase();
            case TextCaseKind.SentenceCase:
                splitter = '.';
                break;
            case TextCaseKind.StartCase:
                splitter = ' ';
                break;
            case TextCaseKind.PascalCase:
                break;
            case TextCaseKind.CamelCase:
                shouldBeLowerFirstChar = true;
                break;
            case TextCaseKind.SnakeCase:
            case TextCaseKind.KebabCase:
            default:
                isSnakeKebab = true;
                shouldBeLowerFirstChar = true;
                break;
        }
        let splits = text.split(splitter).map(y => y.trim()).filter(x => x.length > 0);

        for (let i = 0; i < splits.length; i++) {
            let firstChar: string = '';
            if (i === 0 && shouldBeLowerFirstChar) {
                firstChar = splits[0][0].toLowerCase();
            }
            else {
                if (isSnakeKebab) {
                    firstChar = splits[i][0].toLowerCase();
                }
                else {
                    firstChar = splits[i][0].toUpperCase();
                }
            }
            splits[i] = firstChar + splits[i].slice(1);
        }
        let joinChar = '';
        switch (caseKind) {
            case TextCaseKind.SnakeCase:
                joinChar = '_';
                break;
            case TextCaseKind.KebabCase:
                joinChar = '-';
                break;
            case TextCaseKind.SentenceCase:
                joinChar = '. ';
                break;
            case TextCaseKind.StartCase:
                joinChar = ' ';
                break;
            case TextCaseKind.CamelCase:
            case TextCaseKind.PascalCase:
            default:
                break;
        }
        return splits.join(joinChar);
    }
}