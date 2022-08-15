import SpotifyWebApi from 'spotify-web-api-node';
import {
	Response,
	AuthorizationCodeGrantResponse,
} from '../../interfaces/authCodeGrantResponse';
import { IMusicStreamingComunication } from '../../interfaces/musicStreamingComunication';

export default class SpotifyApiFacade implements IMusicStreamingComunication {
	spotifyApi: SpotifyWebApi;
	scopes: string[];

	constructor() {
		this.spotifyApi = new SpotifyWebApi({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			redirectUri: process.env.SPOTIFY_REDIRECT_URI,
		});
		this.scopes = [
			'user-read-recently-played',
			'user-read-currently-playing',
			'user-read-private',
			'user-read-email',
		];
	}

	getAuthorizeUrl(): string {
		return this.spotifyApi.createAuthorizeURL(this.scopes, '');
	}

	async getInitialCredentials(
		code: string
	): Promise<Response<AuthorizationCodeGrantResponse>> {
		return await this.spotifyApi.authorizationCodeGrant(code);
	}

	async refreshAccessToken(
		accessToken: string,
		refreshToken: string
	): Promise<any> {
		this.spotifyApi.setAccessToken(accessToken);
		this.spotifyApi.setRefreshToken(refreshToken);
		return await this.spotifyApi.refreshAccessToken();
	}
}
