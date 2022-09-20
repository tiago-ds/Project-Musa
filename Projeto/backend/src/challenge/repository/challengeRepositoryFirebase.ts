import { FirebaseApiFacade } from '../../facades/firebaseApiFacade';
import { Challenge } from '../models/Challenge';
import { ChallengeRepositoryInterface } from '../models/challengeRepositoryInterface';

export class ChallengeRepositoryFirebase
	implements ChallengeRepositoryInterface
{
	private readonly firebaseApi: FirebaseApiFacade<Challenge>;

	constructor() {
		this.firebaseApi = new FirebaseApiFacade<Challenge>('challenges');
	}

	async createChallenge(challenge: Challenge): Promise<boolean> {
		return this.firebaseApi.save(challenge, challenge.id);
	}

	async getChallenge(challengeId: string): Promise<Object> {
		return this.firebaseApi.get(challengeId);
	}

	async updateChallenge(challenge: Challenge): Promise<boolean> {
		return this.firebaseApi.update(challenge.id, challenge);
	}

	async deleteChallenge(challengeId: string): Promise<boolean> {
		return this.firebaseApi.delete(challengeId);
	}
}
