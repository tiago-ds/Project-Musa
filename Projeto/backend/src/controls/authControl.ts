import {
	AuthorizationCodeGrantResponse,
	RefreshAccessTokenResponse,
} from '../interfaces/authCodeGrantResponse';
import SpotifyApiFacade from '../facades/spotifyApiFacade';
import { MusaResponse } from '../models/Response';
import { Credentials } from '../models/Credentials';
import UserCollection from '../collections/userCollection';

export default class AuthControl {
	spotifyApi: SpotifyApiFacade;
	userCollection: UserCollection;

	constructor() {
		this.spotifyApi = new SpotifyApiFacade();
		this.userCollection = new UserCollection();
	}

	async getAuthorizeUrl<T>(redirectUri: T): Promise<MusaResponse<string>> {
		const authorizeUrl = await this.spotifyApi.getAuthorizeUrl(
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
			await this.spotifyApi.getInitialCredentials(
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
			await this.spotifyApi.refreshAccessToken(
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
		const loginResponse = await this.spotifyApi.getProfileInfo(
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
