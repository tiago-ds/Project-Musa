import {
	AuthorizationResponse,
	AuthorizationCodeGrantResponse,
	RefreshAccessTokenResponse,
} from './authCodeGrantResponse';

export interface IMusicStreamingComunication {
	getAuthorizeUrl(redirectUri: string): string;
	getInitialCredentials(
		code: string
	): Promise<AuthorizationResponse<AuthorizationCodeGrantResponse>>;
	refreshAccessToken(
		accessToken: string,
		refreshToken: string
	): Promise<AuthorizationResponse<RefreshAccessTokenResponse>>;
	getProfileInfo(
		accessToken: string,
		refreshToken: string
	):  Promise<any>;
}
