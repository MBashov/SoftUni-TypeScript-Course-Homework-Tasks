import { Cipher } from "./contracts/cipher";
import { PartialMessageEncoder } from "./contracts/implemented/partialMessageEncoder";
import { Language } from "./contracts/language";
import { MessageEncoder } from "./contracts/messageEncoder";

export class LanguageMessageEncoder<T extends Language, V extends Cipher<T>> extends PartialMessageEncoder implements MessageEncoder {

    private encodedCharsCount = 0;
    private decodedCharsCount = 0;

    constructor(language: T, cipher: V) {
        super(language, cipher);
    }

    public encodeMessage(secretMessage: unknown) {
        if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
            return 'No message.';
        }

        const strippedMessage = this.stripForbiddenSymbols(secretMessage);
        const isCompatibleMessage = this.language.isCompatibleToCharset(strippedMessage);

        if (!isCompatibleMessage) {
            return "Message not compatible.";
        }

        const encodedMessage = this.cipher.encipher(strippedMessage);
        this.encodedCharsCount += encodedMessage.length;
        return encodedMessage;
    }

    public decodeMessage(secretMessage: unknown): string {
        if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
           return 'No message.';
        }

        const isCompatibleMessage = this.language.isCompatibleToCharset(secretMessage);

        if (!isCompatibleMessage) {
            return "Message not compatible.";
        }

        const decodedMessage = this.cipher.decipher(secretMessage);
        this.decodedCharsCount += decodedMessage.length;
        return decodedMessage;
    }

    public totalProcessedCharacters(type: 'Encoded' | 'Decoded' | 'Both'): string {
        let count = 0;
        switch (type) {
            case "Encoded":
                count = this.encodedCharsCount;
                break;
            case "Decoded":
                count = this.decodedCharsCount;
                break;
            case "Both":
                count = this.decodedCharsCount + this.encodedCharsCount;
                break;
        }

        return `Total processed characters count: ${count}`
    }

    protected stripForbiddenSymbols(message: string): string {
        let forbiddenSymbols = PartialMessageEncoder.forbiddenSymbols;
        forbiddenSymbols.forEach(x => message = message.replaceAll(x, ''));
        return message;
    }
}
