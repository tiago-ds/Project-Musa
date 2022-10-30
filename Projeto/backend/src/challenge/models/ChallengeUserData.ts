import { ChallengeSong } from './ChallengeSong';

export interface ChallengeUserData {
	name: string;
	points: number;
	listenedSongs: Array<ChallengeSong>;
	pictureUrl: string;
}
