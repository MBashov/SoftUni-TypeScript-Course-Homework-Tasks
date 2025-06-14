import { Language } from "./contracts/language";
type DNABasis = 'A' | 'C' | 'G' | 'T'

export class DNACodeLanguage implements Language {
    private _charset: Set<DNABasis> = new Set(['A', 'C', 'G', 'T']);


    get charset() {
        return this._charset;
    }

    isCompatibleToCharset(message: string): boolean {
        const msgChars = message.split('');
        const allowedChars: string[] = Array.from(this.charset.values());
        const isCompatible = msgChars.every(char => allowedChars.includes(char));

        return isCompatible;
    }
}
