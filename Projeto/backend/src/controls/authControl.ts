import {
	AuthorizationCodeGrantResponse,
	RefreshAccessTokenResponse,
} from '../interfaces/authCodeGrantResponse';
import { MusaResponse } from '../models/Response';
import { Credentials } from '../models/Credentials';

import UserCollection from '../collections/userCollection';

import { MusicServiceFactory } from '../factories/musicServiceFactory';
import { IMusicStreamingComunication } from '../interfaces/musicStreamingComunication';

export default class AuthControl {
	streamingApi: IMusicStreamingComunication;
	userCollection: UserCollection;
	musicServiceFactory: MusicServiceFactory = new MusicServiceFactory();

	constructor() {
		this.streamingApi = this.musicServiceFactory.create("spotify");
		this.userCollection = new UserCollection();
	}

	async getAuthorizeUrl<T>(redirectUri: T): Promise<MusaResponse<string>> {
		const authorizeUrl = await this.streamingApi.getAuthorizeUrl(
			redirectUri as unknown as string
		);

		if (authorizeUrl) {
			return {
				data: authorizeUrl,
				statusCode: 200,
			};
		} else {
			return {
				data: null,
				statusCode: 404,
			};
		}
	}
	async getCredentials<T>(
		code: T
	): Promise<MusaResponse<AuthorizationCodeGrantResponse>> {
		const authorizationCodeGrantResponse =
			await this.streamingApi.getInitialCredentials(
				code as unknown as string
			);

		const authorizationCodeGrant = authorizationCodeGrantResponse.body;

		if (authorizationCodeGrantResponse) {
			return {
				data: authorizationCodeGrant,
				statusCode: 200,
			};
		} else {
			return {
				data: null,
				statusCode: 404,
			};
		}
	}

	async refreshToken<T>(
		tokens: T
	): Promise<MusaResponse<RefreshAccessTokenResponse>> {
		const credentialsTokens =
			tokens as unknown as RefreshAccessTokenResponse;
		console.log(credentialsTokens);

		const refreshAccessTokenResponse =
			await this.streamingApi.refreshAccessToken(
				credentialsTokens.access_token,
				credentialsTokens.refresh_token
			);

		if (refreshAccessTokenResponse) {
			return {
				data: refreshAccessTokenResponse.body,
				statusCode: 200,
			};
		} else {
			return {
				data: null,
				statusCode: 404,
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
			return {
				data: userFound,
				statusCode: 200,
			};
		} else if (loginResponse && !userFound) {
			const userCreated = await this.userCollection.createUser(
				loginResponse.body
			);

			if (userCreated) {
				return {
					data: loginResponse.body.id,
					statusCode: 200,
				};
			} else {
				return {
					data: null,
					statusCode: 404,
				};
			}
		} else {
			return {
				data: null,
				statusCode: 404,
			};
		}
	}
}
