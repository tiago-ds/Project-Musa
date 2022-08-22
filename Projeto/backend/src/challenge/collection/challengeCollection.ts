import { Challenge } from '../models/Challenge';
import { ChallengeRepositoryFirebase } from '../repository/challengeRepositoryFirebase';

export default class ChallengeCollection {
	private challengeRepository: ChallengeRepositoryFirebase;
	constructor() {
		this.challengeRepository = new ChallengeRepositoryFirebase();
	}
	async createChallenge(challenge: Challenge): Promise<boolean> {
		return await this.challengeRepository.createChallenge(challenge);
	}
}
