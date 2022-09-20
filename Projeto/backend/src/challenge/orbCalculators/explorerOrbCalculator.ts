import { OrbCalculatorInterface } from './../models/orbCalculatorInterface';
import { ChallengeType } from '../models/ChallengeType';
import { Orb } from './../models/Orb';
import { TrackInfo } from '../models/TrackInfo';

export class ExplorerOrbCalculator implements OrbCalculatorInterface {
	async calculateOrb(tracksInfo: TrackInfo[]): Promise<Orb> {
		const orb: Orb = {
			points: 0,
			challengeSongs: [],
			type: ChallengeType.Explorer
		};
		for (const trackInfo of tracksInfo) {
			const track = trackInfo.track;
			console.log(trackInfo);

			const challengeSong = {
				spotifyId: track.id,
				title: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				albumImageUrl: track.album.images[0].url,
				timestamp: new Date(trackInfo.playedAt).getTime(),
				points: 100 - track.popularity
			};

			orb.challengeSongs.push(challengeSong);

			orb.points += challengeSong.points;
		}
		return orb;
	}
}
