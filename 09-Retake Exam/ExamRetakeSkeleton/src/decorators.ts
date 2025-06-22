export function decorator1(target: any, propertyKey: string, descriptor: PropertyDescriptor) { }

export function decorator2(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: { _optimalWeight?: number }, flyerWeight?: number) {
        let totalLift = originalMethod.call(this, flyerWeight);

        if (
            typeof this._optimalWeight === "number" &&
            typeof flyerWeight === "number" &&
            flyerWeight > this._optimalWeight
        ) {
            totalLift /= 2;
        }

        return totalLift;
    };

    return descriptor;
}

export function decorator3<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        _optimalWeight?: number;

        constructor(...args: any[]) {
            super(...args);
            this._optimalWeight = args[2];
        }
    };
}


export function decorator4(target: any, propertyKey: string, descriptor: PropertyDescriptor) {}