import { Language } from "./contracts/language";
import { DNABases } from "./types";

export class DNACodeLanguage implements Language {
    private _charset: Set<DNABases>  = new Set(['A', 'C', 'G', 'T']);


    get charset() {
        return this._charset;    
    }

    isCompatibleToCharset(message: string): boolean {
        const msgChars = message.split('');
        const allowChars: string[] = Array.from(this.charset.values());
        const isCompatible = msgChars.every(ch => allowChars.includes(ch));

        return isCompatible;
    }
}