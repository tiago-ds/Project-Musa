import { ChallengeType } from '../models/ChallengeType';
import { Orb } from '../models/Orb';
import { TrackInfo } from '../models/TrackInfo';
import { OrbCalculatorInterface } from '../models/orbCalculatorInterface';

export class StanOrbCalculator implements OrbCalculatorInterface {
	artist: string;

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
				points: this.calculateStanPoints(track.artists[0].name, track.duration_ms),
				playedAt: trackInfo.playedAt
			};

			orb.challengeSongs.push(challengeSong);

			orb.points += challengeSong.points;
		}
		return orb;
	}
	calculateStanPoints(artist: string, trackDuration: number): number {
		if(artist === this.artist)
			return Math.trunc(trackDuration/1000);
		return 0;
	}
}
