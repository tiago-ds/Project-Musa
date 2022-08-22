import { Challenge } from './Challenge';

export interface ChallengeRepositoryInterface {
	createChallenge(challenge: Challenge): Promise<boolean>;
}
