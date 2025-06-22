import { LiftingGas } from "./contracts/gasses/liftingGas";
import { PassiveLift } from "./contracts/lift/passiveLift";

export class Glider implements PassiveLift {
  public readonly maxHeight: number;
  public descentSpeed: number;
  public static readonly liftCoefficient: number = 0.6;

  constructor(maxHeight: number, descentSpeed: number) {
    this.maxHeight = maxHeight;
    this.descentSpeed = descentSpeed;
  }

  getAltitudeChange(gas: LiftingGas, altitude: number): number {

    return -(this.descentSpeed * (1 - Glider.liftCoefficient));
  }
}
