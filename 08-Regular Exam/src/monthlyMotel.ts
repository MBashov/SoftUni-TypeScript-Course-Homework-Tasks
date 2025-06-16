import { Motel } from "./contracts/motel";
import { PartialMonthlyMotel } from "./contracts/partialMonthlyMotel";
import { Room } from "./contracts/room";
import { SummerMonth, WinterMonth } from "./contracts/util";
import { roomNumbers } from "./types";

export class MonthlyMotel<T extends WinterMonth | SummerMonth> extends PartialMonthlyMotel implements Motel {
    private totalBudget = 0;
    private rooms: Map<Room["roomNumber"], Room> = new Map();
    private bookings: Map<Room["roomNumber"], T> = new Map();

    addRoom(room: Room): string {
        if (!this.isRoom(room)) {
            return "Value was not a Room.";
        }
        const isRoomExist = this.rooms.has(room.roomNumber);
        if (isRoomExist) {
            return `Room ${room.roomNumber} already exists.`
        }
        this.rooms.set(room.roomNumber, room);
        return `Room ${room.roomNumber} added.`;
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

        const roomPrice = this.rooms.get(roomNumber)?.totalPrice!;
        this.totalBudget += roomPrice;

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

        const room = this.rooms.get(roomNumber)!;
        this.totalBudget -= room.cancellationPrice;

        this.bookings.delete(roomNumber);
        return `Booking cancelled for Room ${roomNumber} for ${bookedMonth}.`;
    }


    getTotalBudget(): string {
        let motelNameString = super.getTotalBudget();
        const output = `${motelNameString}\nTotal budget: $${this.totalBudget.toFixed(2)}`;

        return output;
    }

    private isRoom(value: any): value is Room {
        return (
            typeof value === 'object' &&
            value !== null &&
            typeof value.roomNumber === 'string' &&
            typeof value.totalPrice === 'number' &&
            typeof value.cancellationPrice === 'number'
        );
    }
}

