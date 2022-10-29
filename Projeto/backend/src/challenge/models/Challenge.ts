import { ChallengeType } from './ChallengeType';
import { ChallengeUserData } from './ChallengeUserData';
import { StanArtist } from './StanArtist';

export interface Challenge {
	id: string;
	challengeData: Map<string, ChallengeUserData>;
	artist?: StanArtist;
	type: ChallengeType;
	finished: boolean;
	startingTimestamp: number;
	finishingTime: number;
	lastUpdated: number;
}
