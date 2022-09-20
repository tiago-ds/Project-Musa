import ChallengeCollection from '../collection/challengeCollection';
import SpotifyApiFacade from '../../facades/spotifyApiFacade';
import { Challenge } from '../models/Challenge';
import { MusicServiceFactory } from '../../factories/musicServiceFactory';
import AuthCollection from '../../auth/collection/authCollection';
import { ExplorerOrbCalculator } from '../orbCalculators/explorerOrbCalculator';
import { MusaResponse } from '../../models/Response';

export default class ChallengeControl {
	explorerOrbCalculator: ExplorerOrbCalculator;
	streamingApi: SpotifyApiFacade;
	challengeCollection: ChallengeCollection;
	credentialsCollection: AuthCollection;
	musicServiceFactory: MusicServiceFactory = new MusicServiceFactory();

	constructor() {
		this.streamingApi = this.musicServiceFactory.create('spotify');
		this.challengeCollection = new ChallengeCollection();
		this.credentialsCollection = new AuthCollection();
		this.explorerOrbCalculator = new ExplorerOrbCalculator();
	}

	async createChallenge<T>(challenge: T): Promise<any> {
		console.log(challenge);

		const challengeCreated = this.challengeCollection.createChallenge(
			challenge as unknown as Challenge
		);

		if (challengeCreated) {
			return {
				data: (challenge as unknown as Challenge).id,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async refreshChallenge(id: string): Promise<MusaResponse<Challenge>> {
		let challenge = await this.challengeCollection.getChallenge(id);
		console.log(challenge);

		if (challenge) {
			for (const userId of Object.keys(challenge.challengeData)) {
				const userCredentials =
					await this.credentialsCollection.getCredentials(userId);
				console.log(userCredentials);

				if (userCredentials) {
					this.streamingApi.setCredentials(
						userCredentials.access_token,
						userCredentials.refresh_token
					);

					const userPlayedTracks = (
						await this.streamingApi.getUserRecentlyPlayedTracks(
							50,
							challenge.lastUpdated
						)
					)?.body;

					const tracksInfo = [];

					for (const track of userPlayedTracks.items) {
						const trackInfo = {
							track: await this.streamingApi.getTrack(
								track.track.id
							),
							trackFeatures:
								await this.streamingApi.getTrackFeatures(
									track.track.id
								),
							playedAt: track.played_at
						};
						tracksInfo.push(trackInfo);
					}
					const trackOrb =
						await this.explorerOrbCalculator.calculateOrb(
							tracksInfo
						);
					console.log(trackOrb);

					challenge = {
						...challenge,
						challengeData: challenge.challengeData.set(userId, {
							...challenge.challengeData.get(userId),
							points: trackOrb.points,
							listenedSongs: challenge.challengeData
								.get(userId)
								.listenedSongs.concat(tracksInfo)
						})
					};
				}

				await this.challengeCollection.updateChallenge(challenge);
				return {
					data: challenge,
					statusCode: 200
				};
			}
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}
}
