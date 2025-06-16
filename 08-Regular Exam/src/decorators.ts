import { AirconditionedRoom } from "./contracts/airconditionedRoom";

export function decorator1(constructor: Function) {
    // return class extends (constructor as { new(...args: any[]): AirconditionedRoom }) {
    //     constructor(...args: any[]) {
    //         args[0] = args[0] * 1.2;
    //         super(...args);
    //     }
    // }
}

export function decorator2(target: any, propName: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;

    descriptor.get = function () {
        const result = originalGetter?.call(this);

        return result * 1.20;
    }
}

export function decorator3(target: any, propName: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;

    descriptor.get = function () {
        const result = originalGetter?.call(this);

        return result * 1.20;
    }
}

export function decorator4(target: any, methodName: string, index: number) { }

export function decorator5<T extends abstract new (...args: any[]) => {}>(constructor: T) {
    abstract class extendedPartialMotel extends constructor {
        public static readonly MotelName = 'Monthly Motel';
    }

    return extendedPartialMotel;
}
