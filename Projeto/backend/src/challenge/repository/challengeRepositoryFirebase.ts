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
}
