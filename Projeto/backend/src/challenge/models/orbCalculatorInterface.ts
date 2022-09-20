import { Orb } from './Orb';
import { TrackInfo } from './TrackInfo';
export interface OrbCalculatorInterface {
	calculateOrb(tracks: TrackInfo[]): Orb;
}
