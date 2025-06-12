import { PartialMessageEncoder } from "./contracts/implemented/partialMessageEncoder";
import { Language } from "./contracts/language";
import { MessageEncoder } from "./contracts/messageEncoder";
import { Cipher } from './contracts/cipher';
import { ProccedCharsType } from "./types";

export class LanguageMessageEncoder<T extends Language, V extends Cipher<T>> extends PartialMessageEncoder implements MessageEncoder {
    private encodedCharsCount = 0;
    private decodedCharsCount = 0;

    constructor(language: T, cipher: V) {
        super(language, cipher);
    }

    public encodeMessage(secretMessage: unknown) {
        if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
            return 'No message.'
        }
        const strippedMsg = this.stripForbiddenSymbols(secretMessage);
        const isCompatible = this.language.isCompatibleToCharset(strippedMsg);

        if (!isCompatible) {
            return ('Message not compatible.')
        }

        const encodedMSg = this.cipher.encipher(strippedMsg);
        this.encodedCharsCount += encodedMSg.length;
        return encodedMSg;
    }

    public decodeMessage(secretMessage: unknown): string {
        if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
            return 'No message.'
        }

        const isCompatible = this.language.isCompatibleToCharset(secretMessage);

        if (!isCompatible) {
            return ('Message not compatible.')
        }

        const decodedMsg = this.cipher.decipher(secretMessage);
        this.decodedCharsCount += decodedMsg.length;
        return decodedMsg;
    }

    public totalProcessedCharacters(type: ProccedCharsType): string {
        let totalChars = 0;

        switch (type) {
            case "Encoded":
                totalChars = this.encodedCharsCount;
                break;
            case "Decoded":
                totalChars = this.decodedCharsCount;
                break;
            case "Both":
                totalChars = this.encodedCharsCount + this.decodedCharsCount;
                break;
        }

        return `Total processed characters count: ${totalChars}`
    }

    protected stripForbiddenSymbols(message: string): string {
        let forbiddenSymbols = PartialMessageEncoder.forbiddenSymbols;
        forbiddenSymbols.forEach(x => message = message.replaceAll(x, ''));
        return message;
    }
}
