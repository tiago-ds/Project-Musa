import ChallengeCollection from '../collection/challengeCollection';
import SpotifyApiFacade from '../../facades/spotifyApiFacade';
import { Challenge } from '../models/Challenge';
import { MusicServiceFactory } from '../../factories/musicServiceFactory';
import AuthCollection from '../../auth/collection/authCollection';
import { ExplorerOrbCalculator } from '../orbCalculators/explorerOrbCalculator';
import { MusaResponse } from '../../models/Response';
import { EnergeticOrbCalculator } from '../orbCalculators/energeticOrbCalculator';
import { ChallengeType } from '../models/ChallengeType';
import { v4 } from 'uuid';

export default class ChallengeControl {
	explorerOrbCalculator: ExplorerOrbCalculator;
	energeticOrbCalculator: EnergeticOrbCalculator;
	streamingApi: SpotifyApiFacade;
	challengeCollection: ChallengeCollection;
	credentialsCollection: AuthCollection;
	musicServiceFactory: MusicServiceFactory = new MusicServiceFactory();
	mapOrbTypes: Map<String, any>;

	constructor() {
		this.streamingApi = this.musicServiceFactory.create('spotify');
		this.challengeCollection = new ChallengeCollection();
		this.credentialsCollection = new AuthCollection();
		this.energeticOrbCalculator = new EnergeticOrbCalculator();
		this.mapOrbTypes = new Map();
		this.mapOrbTypes.set(
			ChallengeType.Energetic,
			this.energeticOrbCalculator.calculateOrb.bind(this)
		);
		this.explorerOrbCalculator = new ExplorerOrbCalculator();
		this.mapOrbTypes.set(
			ChallengeType.Explorer,
			this.explorerOrbCalculator.calculateOrb.bind(this)
		);
	}

	async createChallenge<T>(challenge: T): Promise<any> {
		console.log(challenge);

		const id = v4();

		const challengeCreated = await this.challengeCollection.createChallenge(
			{
				...challenge,
				id
			} as unknown as Challenge
		);

		if (challengeCreated) {
			return {
				data: {
					...challenge,
					id
				},
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
		let result;
		console.log(challenge);

		if (challenge) {
			for (const userId of Object.keys(challenge.challengeData)) {
				let userCredentials =
					await this.credentialsCollection.getCredentials(userId);
				console.log(userCredentials);
				if (userCredentials.expires_at < new Date().getTime()) {
					userCredentials = {
						refresh_token: userCredentials.refresh_token,
						expires_at: new Date().getTime() + 3600 * 1000,
						...(
							await this.streamingApi.refreshAccessToken(
								userCredentials.access_token,
								userCredentials.refresh_token
							)
						).body
					};
					await this.credentialsCollection.updateCredentials(
						userCredentials,
						userId
					);
				}

				if (userCredentials) {
					this.streamingApi.setCredentials(
						userCredentials.access_token,
						userCredentials.refresh_token
					);

					const userPlayedTracks = (
						await this.streamingApi.getUserRecentlyPlayedTracks(
							50,
							challenge.lastUpdated - 60 * 1000
						)
					)?.body;

					const tracksInfo = [];

					for (const track of userPlayedTracks.items) {
						const trackInfo = {
							track: (
								await this.streamingApi.getTrack(track.track.id)
							).body,
							trackFeatures:
								challenge.type == ChallengeType.Energetic
									? (
											await this.streamingApi.getTrackFeatures(
												track.track.id
											)
									  ).body
									: null,
							playedAt: track.played_at
						};
						tracksInfo.push(trackInfo);
					}

					const trackOrb = this.mapOrbTypes.get(challenge.type)(
						tracksInfo
					);

					const listenedSong =
						challenge.challengeData[userId].listenedSongs;
					const points = challenge.challengeData[userId].points;
					const name = challenge.challengeData[userId].name;

					challenge = {
						...challenge,
						challengeData: {
							...challenge.challengeData,
							[userId]: {
								listenedSongs: listenedSong.concat(
									trackOrb.challengeSongs
								),
								points: points + trackOrb.points,
								name: name
							}
						},
						lastUpdated: new Date().getTime()
					};

					result = await this.challengeCollection.updateChallenge(
						challenge
					);
				}
			}
			if (result) {
				return {
					data: challenge,
					statusCode: 200
				};
			} else {
				return {
					data: null,
					statusCode: 400
				};
			}
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async joinChallenge(
		challengeId: string,
		userId: string,
		userName: string
	): Promise<MusaResponse<Challenge>> {
		let challenge: Challenge = await this.challengeCollection.getChallenge(
			challengeId
		);
		if (challenge) {
			if (
				Object.keys(challenge.challengeData).find(
					(it: string) => it === userId
				)
			) {
				return {
					data: challenge,
					statusCode: 200
				};
			}
			challenge = {
				...challenge,
				challengeData: {
					...challenge.challengeData,
					[userId]: {
						listenedSongs: [],
						name: userName,
						points: 0
					}
				}
			};

			const result: boolean =
				await this.challengeCollection.updateChallenge(challenge);

			if (result) {
				return {
					data: challenge,
					statusCode: 200
				};
			} else {
				return {
					data: null,
					statusCode: 400
				};
			}
		} else {
			return {
				data: null,
				statusCode: 400
			};
		}
	}
}
