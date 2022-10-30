import ChallengeCollection from '../collection/challengeCollection';
import SpotifyApiFacade from '../../facades/spotifyApiFacade';
import { Challenge } from '../models/Challenge';
import { MusicServiceFactory } from '../../factories/musicServiceFactory';
import AuthCollection from '../../auth/collection/authCollection';
import { MusaResponse } from '../../models/Response';
import { ChallengeType } from '../models/ChallengeType';
import { v4 } from 'uuid';
import { ExplorerOrbCalculator } from '../orbCalculators/explorerOrbCalculator';
import { EnergeticOrbCalculator } from '../orbCalculators/energeticOrbCalculator';
import { StanOrbCalculator } from '../orbCalculators/stanOrbCalculator';
import AuthControl from '../../auth/control/authControl';
import { StanArtist } from '../models/StanArtist';

export default class ChallengeControl {
	explorerOrbCalculator: ExplorerOrbCalculator;
	energeticOrbCalculator: EnergeticOrbCalculator;
	stanOrbCalculator: StanOrbCalculator;
	streamingApi: SpotifyApiFacade;
	challengeCollection: ChallengeCollection;
	credentialsCollection: AuthCollection;
	musicServiceFactory: MusicServiceFactory = new MusicServiceFactory();
	mapOrbTypes: Map<String, any>;
	authControl: AuthControl;
	stanArtist: StanArtist;

	constructor() {
		this.streamingApi = this.musicServiceFactory.create('spotify');
		this.challengeCollection = new ChallengeCollection();
		this.credentialsCollection = new AuthCollection();
		this.authControl = new AuthControl();
		this.energeticOrbCalculator = new EnergeticOrbCalculator();
		this.mapOrbTypes = new Map();
		this.energeticOrbCalculator = new EnergeticOrbCalculator();
		this.explorerOrbCalculator = new ExplorerOrbCalculator();
		this.stanOrbCalculator = new StanOrbCalculator();
		this.mapOrbTypes.set(
			ChallengeType.Energetic,
			this.energeticOrbCalculator.calculateOrb.bind(this)
		);

		this.mapOrbTypes.set(
			ChallengeType.Explorer,
			this.explorerOrbCalculator.calculateOrb.bind(this)
		);

		this.mapOrbTypes.set(
			ChallengeType.Stan,
			this.stanOrbCalculator.calculateOrb.bind(this)
		);
	}

	async createChallenge<T>(challenge: T): Promise<any> {
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
		const updateAt = new Date().getTime();

		if (!challenge) {
			return {
				data: null,
				statusCode: 404
			};
		}

		for (const userId of Object.keys(challenge.challengeData)) {
			let userCredentials =
				await this.credentialsCollection.getCredentials(userId);

			if (userCredentials.expires_at > new Date().getTime()) {
				const response = await this.authControl.refreshToken(
					userCredentials
				);

				if (response.statusCode !== 200) {
					return {
						data: null,
						statusCode: 401
					};
				}
				this.streamingApi.setCredentials(
					response.data.access_token,
					userCredentials.refresh_token
				);
			}

			const userPlayedTracks = (
				await this.streamingApi.getUserRecentlyPlayedTracks(
					50,
					challenge.lastUpdated - 300 * 1000
				)
			)?.body;

			const tracksInfo = [];

			for (const track of userPlayedTracks.items) {
				const trackInfo = {
					track: (await this.streamingApi.getTrack(track.track.id))
						.body,
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

			if (challenge.type === ChallengeType.Stan)
				this.stanArtist = challenge.artist;

			const trackOrb = this.mapOrbTypes.get(challenge.type)(tracksInfo);

			const listenedSong = challenge.challengeData[userId].listenedSongs;
			const points = challenge.challengeData[userId].points;
			const name = challenge.challengeData[userId].name;

			challenge = {
				...challenge,
				challengeData: {
					...challenge.challengeData,
					[userId]: {
						listenedSongs: listenedSong.concat(
							trackOrb.challengeSongs.filter((song) => {
								return !listenedSong.find((listened) => {
									return listened.timestamp == song.timestamp;
								});
							})
						),
						points: points + trackOrb.points,
						name: name,
						pictureUrl: challenge.challengeData[userId].pictureUrl
					}
				},
				lastUpdated: updateAt
			};

			result = await this.challengeCollection.updateChallenge(challenge);
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
	}

	async joinChallenge(
		challengeId: string,
		userId: string,
		userName: string,
		pictureUrl: string
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
						points: 0,
						pictureUrl
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

	async searchArtist(
		userId: string,
		searchTerm: string
	): Promise<MusaResponse<any>> {
		let userCredentials = await this.credentialsCollection.getCredentials(
			userId
		);
		let refreshToken: any;

		if (userCredentials.expires_at > new Date().getTime()) {
			refreshToken = await this.authControl.refreshToken(userCredentials);

			if (refreshToken.statusCode !== 200) {
				return {
					data: null,
					statusCode: 401
				};
			}
			await this.streamingApi.setCredentials(
				refreshToken.data.access_token,
				userCredentials.refresh_token
			);
		} else {
			await this.streamingApi.setCredentials(
				userCredentials.access_token,
				userCredentials.refresh_token
			);
		}

		let results = [];

		const response = await this.streamingApi.search(searchTerm);
		try {
			results = response.body.artists.items;
		} catch (error) {
			return {
				data: null,
				statusCode: 404
			};
		}

		results = results
			.map(({ name, id, images }) => {
				return {
					name,
					id,
					pictureUrl: images[0]?.url
				};
			})
			.slice(0, 5);

		if (results) {
			return {
				data: results,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 400
			};
		}
	}

	async getAvailableOrbTypes(): Promise<string[]> {
		return ['Energetic', 'Explorer', 'Stan'];
	}
}
