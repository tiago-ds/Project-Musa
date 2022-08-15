import {
	Response,
	AuthorizationCodeGrantResponse,
} from './authCodeGrantResponse';

export interface IMusicStreamingComunication {
	getAuthorizeUrl(): string;
	getInitialCredentials(
		code: string
	): Promise<Response<AuthorizationCodeGrantResponse>>;
	refreshAccessToken(accessToken: string, refreshToken: string): Promise<any>;
}
