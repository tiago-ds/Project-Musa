import { ChallengeType } from '../models/ChallengeType';
import { Orb } from '../models/Orb';
import { TrackInfo } from '../models/TrackInfo';
import { OrbCalculatorInterface } from '../models/orbCalculatorInterface';

export class StanOrbCalculator implements OrbCalculatorInterface {
	challenge: any;

	calculateOrb(tracksInfo: TrackInfo[]): Orb {
		const orb: Orb = {
			points: 0,
			challengeSongs: [],
			type: ChallengeType.Stan
		};
		for (const trackInfo of tracksInfo) {
			const track = trackInfo.track;

			const challengeSong = {
				spotifyId: track.id,
				title: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				albumImageUrl: track.album.images[0].url,
				timestamp: new Date(trackInfo.playedAt).getTime(),
				points:
					track.artists[0]?.id == this.challenge.artist.id
						? Math.trunc(track.duration_ms / 1000)
						: 0,
				playedAt: trackInfo.playedAt
			};

			orb.challengeSongs.push(challengeSong);

			orb.points += challengeSong.points;
		}
		return orb;
	}
}
