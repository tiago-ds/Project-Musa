import { Orb } from '../models/Orb';
import { TrackInfo } from '../models/TrackInfo';
import { OrbCalculatorInterface } from './../models/orbCalculatorInterface';

export class EnergeticOrbCalculator implements OrbCalculatorInterface {
	async calculateOrb(tracks: TrackInfo[]): Promise<Orb> {
		return null;
	}
}
