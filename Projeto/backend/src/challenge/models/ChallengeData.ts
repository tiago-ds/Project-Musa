import { ChallengeType } from './ChallengeType';
import { ChallengeUserData } from './ChallengeUserData';

export interface ChallengeData {
	challengeUuid: string;
	type: ChallengeType;
	challengeData: Map<string, ChallengeUserData>;
	finished: boolean;
}
