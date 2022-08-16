import { Challenge } from '../models/Challenge';

export interface ChallengeRepositoryInterface {
	createChallenge(challenge: Challenge): Promise<boolean>;
}
