import { ChallengeType } from '../models/ChallengeType';
import { Orb } from '../models/Orb';
import { TrackInfo } from '../models/TrackInfo';
import { OrbCalculatorInterface } from './../models/orbCalculatorInterface';

export class EnergeticOrbCalculator implements OrbCalculatorInterface {
	calculateOrb(tracksInfo: TrackInfo[]): Orb {
		const orb: Orb = {
			points: 0,
			challengeSongs: [],
			type: ChallengeType.Energetic
		};
		for (const trackInfo of tracksInfo) {
			const track = trackInfo.track;
			const trackFeatures = trackInfo.trackFeatures;

			const challengeSong = {
				spotifyId: track.id,
				title: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				albumImageUrl: track.album.images[0].url,
				timestamp: new Date(trackInfo.playedAt).getTime(),
				points: Math.floor(trackFeatures.energy * 100),
				playedAt: trackInfo.playedAt
			};

			orb.challengeSongs.push(challengeSong);

			orb.points += challengeSong.points;
		}
		return orb;
	}
}
