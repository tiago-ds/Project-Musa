export interface AuthorizationCodeGrantResponse {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}

export interface Response<AuthorizationCodeGrantResponse> {
	body: AuthorizationCodeGrantResponse;
	headers: Record<string, string>;
	statusCode: number;
}
