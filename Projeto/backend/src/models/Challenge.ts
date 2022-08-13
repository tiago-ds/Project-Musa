import { ChallengeType } from './ChallengeType';
import { ChallengeUserData } from './ChallengeUserData';

export interface Challenge {
	id: string;
	challengeData: Map<string, ChallengeUserData>;
	type: ChallengeType;
	finished: boolean;
	startingTimestamp: Date;
	finishingTime: Date;
	lastUpdated: Date;
}
