import { Room } from "./contracts/room";
import { RoomNumber } from "./types";

export class Apartment implements Room {
    readonly roomNumber;
    protected _price: number;
    protected _numberOfGuests: number;

    constructor(price: number, roomNumber: RoomNumber, numberOfGuests: number) {
        this._price = price;
        this.roomNumber = roomNumber;
        this._numberOfGuests = numberOfGuests;
    }

    get totalPrice(): number {
        return this._numberOfGuests * this._price;
    }

    get cancellationPrice(): number {
        return this.totalPrice * 0.80;
    };
}