import {
	AuthorizationCodeGrantResponse,
	RefreshAccessTokenResponse
} from '../models/authCodeGrantResponse';
import { MusaResponse } from '../../models/Response';
import { Credentials } from '../models/Credentials';

import UserCollection from '../../user/collection/userCollection';

import { MusicServiceFactory } from '../../factories/musicServiceFactory';
import { IMusicStreamingComunication } from '../../interfaces/musicStreamingComunication';
import AuthCollection from '../collection/authCollection';

export default class AuthControl {
	streamingApi: IMusicStreamingComunication;
	userCollection: UserCollection;
	authCollection: AuthCollection;
	musicServiceFactory: MusicServiceFactory = new MusicServiceFactory();

	constructor() {
		this.streamingApi = this.musicServiceFactory.create('spotify');
		this.userCollection = new UserCollection();
		this.authCollection = new AuthCollection();
	}

	async getAuthorizeUrl<T>(redirectUri: T): Promise<MusaResponse<string>> {
		const authorizeUrl = await this.streamingApi.getAuthorizeUrl(
			redirectUri as unknown as string
		);

		if (authorizeUrl) {
			return {
				data: authorizeUrl,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}
	async getCredentials<T>(
		credentials: T
	): Promise<MusaResponse<AuthorizationCodeGrantResponse>> {
		const authorizationCodeGrantResponse =
			await this.streamingApi.getInitialCredentials(
				credentials as unknown as string
			);

		const authorizationCodeGrant = authorizationCodeGrantResponse.body;

		if (authorizationCodeGrantResponse) {
			return {
				data: authorizationCodeGrant,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async refreshToken<T>(
		tokens: T
	): Promise<MusaResponse<RefreshAccessTokenResponse>> {
		const credentialsTokens =
			tokens as unknown as RefreshAccessTokenResponse;

		const refreshAccessTokenResponse = (
			await this.streamingApi.refreshAccessToken(
				credentialsTokens.access_token,
				credentialsTokens.refresh_token
			)
		).body;

		const me = await this.streamingApi.getProfileInfo(
			refreshAccessTokenResponse.access_token,
			refreshAccessTokenResponse.refresh_token
		);

		const userCredentials = {
			...refreshAccessTokenResponse,
			expires_at: new Date().getTime() + 3600 * 1000
		};
		await this.authCollection.updateCredentials(
			userCredentials,
			me.body.id
		);

		if (refreshAccessTokenResponse) {
			return {
				data: refreshAccessTokenResponse,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async login<T>(credentials: T) {
		const credentialsLogin = credentials as unknown as Credentials;
		const loginResponse = await this.streamingApi.getProfileInfo(
			credentialsLogin.access_token,
			credentialsLogin.refresh_token
		);

		const userFound = await this.userCollection.getUser(
			loginResponse.body.id
		);

		if (userFound) {
			this.authCollection.updateCredentials(
				credentialsLogin,
				loginResponse.body.id
			);

			return {
				data: loginResponse,
				statusCode: 200
			};
		} else if (loginResponse && !userFound) {
			const userCreated = await this.userCollection.createUser(
				loginResponse.body
			);

			await this.authCollection.createCredentials(
				credentialsLogin,
				loginResponse.body.id
			);

			if (userCreated) {
				return {
					data: loginResponse.body.id,
					statusCode: 200
				};
			} else {
				return {
					data: null,
					statusCode: 404
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
