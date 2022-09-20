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

	async getChallenge(challengeId: string): Promise<Challenge> {
		return (await this.challengeRepository.getChallenge(
			challengeId
		)) as Challenge;
	}

	async updateChallenge(challenge: Challenge): Promise<boolean> {
		return await this.challengeRepository.updateChallenge(challenge);
	}

	async deleteChallenge(challengeId: string): Promise<boolean> {
		return await this.challengeRepository.deleteChallenge(challengeId);
	}
}
