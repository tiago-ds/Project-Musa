import ChallengeCollection from '../collection/challengeCollection';
import SpotifyApiFacade from '../../facades/spotifyApiFacade';
import { Challenge } from '../models/Challenge';

export default class ChallengeControl {
	spotifyApi: SpotifyApiFacade;
	challengeCollection: ChallengeCollection;

	constructor() {
		this.spotifyApi = new SpotifyApiFacade();
		this.challengeCollection = new ChallengeCollection();
	}

	async createChallenge<T>(challenge: T): Promise<any> {
		const challengeCreated = this.challengeCollection.createChallenge(
			challenge as unknown as Challenge
		);

		if (challengeCreated) {
			return {
				data: (challenge as unknown as Challenge).id,
				statusCode: 200,
			};
		} else {
			return {
				data: null,
				statusCode: 404,
			};
		}
	}
}
