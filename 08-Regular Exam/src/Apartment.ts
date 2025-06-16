import { Room } from "./contracts/room";
import { SummerMonth, WinterMonth } from "./contracts/util";
import { roomNumbers } from "./types";

export class Apartment<T extends WinterMonth | SummerMonth> implements Room {
    private _price: number;
    private _roomNumber: roomNumbers;
    private _numberOfGuests: number;

    public static readonly MotelName = 'Motel';
    private rooms: Map<Room["roomNumber"], Room> = new Map();
    private bookings: Map<Room["roomNumber"], T> = new Map();
    private totalBudget = 0;

    totalPrice: number;
    cancellationPrice: number;

    constructor(price: number, roomNumber: roomNumbers, numberOfGuests: number) {
        this._price = price;
        this._roomNumber = roomNumber;
        this._numberOfGuests = numberOfGuests;

        this.totalPrice = this._price * this._numberOfGuests;
        this.cancellationPrice = this.totalPrice * 0.80;
    }

    get price() {
        return this._price;
    }

    get roomNumber() {
        return this._roomNumber;
    }

    get numberOfGuests() {
        return this._numberOfGuests;
    }

    bookRoom(roomNumber: roomNumbers, bookedMonth: T): string {
        const isRoomExist = this.rooms.has(roomNumber);
        const isRoomBooked = this.bookings.get(roomNumber) === bookedMonth;

        if (!isRoomExist) {
            return `Room ${roomNumber} does not exist.`;
        }

        if (isRoomBooked) {
            return `Room ${roomNumber} is already booked for ${bookedMonth}.`;
        }

        this.bookings.set(roomNumber, bookedMonth);

        const roomPrice = this.rooms.get(roomNumber)?.totalPrice;
        if (roomPrice) {
            this.totalBudget += roomPrice;
        }

        return `Room ${roomNumber} booked for ${bookedMonth}.`;
    }

    cancelBooking(roomNumber: roomNumbers, bookedMonth: T): string {
        const isRoomExist = this.rooms.has(roomNumber);
        const isRoomBooked = this.bookings.get(roomNumber) === bookedMonth;

        if (!isRoomExist) {
            return `Room ${roomNumber} does not exist.`;
        }

        if (!isRoomBooked) {
            return `Room ${roomNumber} is not booked for ${bookedMonth}.`;
        }

        const room = this.rooms.get(roomNumber);
        if (room) {
            this.totalBudget -= room.cancellationPrice;
        }
        
        this.bookings.delete(roomNumber);
        return `Booking cancelled for Room ${roomNumber} for ${bookedMonth}.`;
    }

}
