import { PartialMonthlyMotel } from "./contracts/partialMonthlyMotel";
import { Room } from "./contracts/room";
import { Motel } from "./motel";
import { Month, RoomNumber } from "./types";

export class MonthlyMotel<T extends Month> extends PartialMonthlyMotel implements Motel {
    private budget: number = 0;
    private rooms: Map<RoomNumber, Room> = new Map();
    private bookedRooms: Map<RoomNumber, T[]> = new Map();


    addRoom(room: unknown): string {
        if (!this.isRoom(room)) {
            return "Value was not a Room.";
        }

        if (this.rooms.has(room.roomNumber)) {
            return `Room ${room.roomNumber} already exists.`;
        }

        this.rooms.set(room.roomNumber, room);
        return `Room ${room.roomNumber} added.`;
    }

    bookRoom(roomNumber: RoomNumber, bookedMonth: T): string {
        if (!this.rooms.has(roomNumber)) {
            return `Room ${roomNumber} does not exist.`;
        }

        const bookings = this.bookedRooms.get(roomNumber) || [];

        if (bookings.includes(bookedMonth)) {
            return `Room ${roomNumber} is already booked for ${bookedMonth}.`;
        }

        const room = this.rooms.get(roomNumber)!;
        this.budget += room.totalPrice;

        bookings.push(bookedMonth);
        this.bookedRooms.set(roomNumber, bookings);
        return `Room ${roomNumber} booked for ${bookedMonth}.`;
    }

    cancelBooking(roomNumber: RoomNumber, bookedMonth: T): string {
        if (!this.rooms.has(roomNumber)) {
            return `Room ${roomNumber} does not exist.`;
        }

        const bookings = this.bookedRooms.get(roomNumber) || [];

        if (!bookings.includes(bookedMonth)) {
            return `Room ${roomNumber} is not booked for ${bookedMonth}.`;
        }

        const room = this.rooms.get(roomNumber)!;
        this.budget -= room.cancellationPrice;

        const filtered = bookings.filter(m => m !== bookedMonth);
        this.bookedRooms.set(roomNumber, filtered);

        return `Booking cancelled for Room ${roomNumber} for ${bookedMonth}.`;
    }

    getTotalBudget(): string {
        const motelName = super.getTotalBudget();

        return `${motelName}\nTotal budget: $${this.budget}`;
    }

    private isRoom(possibleRoom: unknown): possibleRoom is Room {
        return possibleRoom !== null &&
            typeof possibleRoom === 'object' &&
            'roomNumber' in possibleRoom &&
            typeof possibleRoom.roomNumber === 'string' &&
            ['A01', 'A02', 'A03', 'B01', 'B02', 'B03'].includes(possibleRoom.roomNumber) &&
            'totalPrice' in possibleRoom &&
            typeof possibleRoom.totalPrice === 'number' &&
            'cancellationPrice' in possibleRoom &&
            typeof possibleRoom.cancellationPrice === 'number';
    }
}