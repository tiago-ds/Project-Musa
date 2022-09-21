import { ChallengeType } from './ChallengeType';
import { ChallengeUserData } from './ChallengeUserData';

export interface Challenge {
	id: string;
	challengeData: Map<string, ChallengeUserData>;
	type: ChallengeType;
	finished: boolean;
	startingTimestamp: number;
	finishingTime: number;
	lastUpdated: number;
}
