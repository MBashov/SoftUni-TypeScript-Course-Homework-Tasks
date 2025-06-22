import { Flyer } from "./contracts/flyer";
import { LiftingGas } from "./contracts/gasses/liftingGas";
import { Propellant } from "./contracts/gasses/propellant";
import { ActiveLift } from "./contracts/lift/activeLift";
import { PassiveLift } from "./contracts/lift/passiveLift";
import { TypeMode } from "./types";

export class FlyingMachine<T extends TypeMode> implements Flyer {
    private _altitude: number;
    private _baseWeight: number;

    private _liftDevice: T extends 'Active' ? ActiveLift : PassiveLift;
    private _gas: T extends 'Active' ? Propellant : LiftingGas;

    private static _totalMetersMoved = 0;


    constructor(
        liftDevice: T extends 'Active' ? ActiveLift : PassiveLift,
        gas: T extends 'Active' ? Propellant : LiftingGas,
        baseWeight: number,
        altitude: number
    ) {
        this._liftDevice = liftDevice;
        this._gas = gas;
        this._baseWeight = baseWeight;
        this._altitude = this.clampInitialAltitude(altitude, liftDevice);

    }

    public static get TotalMetersMoved() {
        return this._totalMetersMoved;
    }


    get altitude(): number {
        return this._altitude;
    }

    get weight(): number {
        if (this.isActive()) {
            const propellant = this._gas as Propellant;
            return this._baseWeight + propellant.fuelWeight;
        }
        return this._baseWeight;
    }

    move(): string {
        let altitudeChange = 0;

        if (this.isActive()) {
            const activeLift = this._liftDevice as ActiveLift;
            const propellant = this._gas as Propellant;

            if (propellant.fuelAmount >= activeLift.fuelConsumptionRate) {
                altitudeChange = activeLift.getAltitudeChange(this.weight);
                propellant.fuelAmount -= activeLift.fuelConsumptionRate;
            } else {
                altitudeChange = 0;
            }
        } else {
            const passiveLift = this._liftDevice as PassiveLift;
            const gas = this._gas as LiftingGas;

            altitudeChange = passiveLift.getAltitudeChange(gas, this._altitude);
        }

        let newAltitude = this._altitude + altitudeChange;

        if (newAltitude < 0) {
            altitudeChange = -this._altitude;
            newAltitude = 0;
        }

        if (!this.isActive()) {
            const maxH = (this._liftDevice as PassiveLift).maxHeight;
            if (newAltitude > maxH) {
                altitudeChange = maxH - this._altitude;
                newAltitude = maxH;
            }
        }

        this._altitude = newAltitude;

      
        (this.constructor as typeof FlyingMachine)._totalMetersMoved += Math.abs(altitudeChange);

        if (Math.abs(altitudeChange) === 0) {
            return 'Flyer stayed in place';
        }

        const direction = altitudeChange > 0 ? 'up' : 'down';
        return `Flyer moved ${Math.abs(altitudeChange).toFixed(2)} meters ${direction}`;
    }

    checkStatus(): string {
        if (this.isActive()) {
            const propellant = this._gas as Propellant;
            return `Flyer altitude: ${Math.floor(this._altitude)} meters\nFlyer weight: ${this.weight}\nFuel left: ${propellant.fuelAmount}`;
        } else {
            const passiveLift = this._liftDevice as PassiveLift;
            return `Flyer altitude: ${Math.floor(this._altitude)} meters\nFlyer weight: ${this.weight}\nMax height: ${passiveLift.maxHeight}`;
        }
    }

    private isActive(): this is FlyingMachine<'Active'> {
        return (this._liftDevice as ActiveLift).fuelConsumptionRate !== undefined;
    }

    private clampInitialAltitude(altitude: number, liftDevice: ActiveLift | PassiveLift): number {
        if (altitude < 0) {
            return 0;
        }

        const passiveLift = liftDevice as PassiveLift;

        if (passiveLift.maxHeight !== undefined && altitude > passiveLift.maxHeight) {
            return passiveLift.maxHeight;
        }

        return altitude;
    }
}