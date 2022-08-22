export interface AuthorizationCodeGrantResponse {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}

export interface AuthorizationResponse<T> {
	body: T;
	headers: Record<string, string>;
	statusCode: number;
}

export interface RefreshAccessTokenResponse {
	access_token: string;
	expires_in: number;
	refresh_token?: string | undefined;
	scope: string;
	token_type: string;
}
