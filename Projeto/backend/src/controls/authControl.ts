import { Request } from 'express';
import SpotifyApiFacade from '../models/facades/spotifyApiFacade';

export default class AuthControl {
	spotifyApi: SpotifyApiFacade;
	handlers = {
		GET: {
			'/auth/auth_url': this.getAuthorizeUrl.bind(this),
		},
		POST: {
			'/auth/credentials': this.getCredentials.bind(this),
			'/auth/refresh_token': this.refreshToken.bind(this),
		},
	};
	constructor() {
		this.spotifyApi = new SpotifyApiFacade();
	}

	async handleAuthRequest(request: Request) {
		console.log('handleAuthRequest', request.body);

		const handler = this.handlers[request.method][request.route.path];

		if (handler) {
			return await handler(request);
		} else {
			return {
				message: 'No handler found for this request',
			};
		}
	}

	async getAuthorizeUrl() {
		const user = await this.spotifyApi.getAuthorizeUrl();

		if (user) {
			return {
				message: `Auth url`,
				data: user,
				statusCode: 200,
			};
		} else {
			return {
				message: `Could not get auth url`,
				statusCode: 404,
			};
		}
	}
	async getCredentials(request: Request) {
		const code = request.body.code;
		const user = await this.spotifyApi.getInitialCredentials(
			'AQBuBsCCnst0XYzTvbwSpTgM1PYT4OhlgMQXf1uJTOYuTF7TXLfE_YcasljtwKG4HwLDGUqcxuGCvs4Pq5hQMgC816g-bTU-0RXZdYfTXdbB4y6Qcizc9JvwgCUGGSdKwAVge5EVqZDzIO01sSnGGsOa9aZK8tqmHi3Wp9RZ-4_V4Avjl495Lp_UuiiK4Wt1JmMMeumacELDFqjo6oyMvkzwwgcofgfbgHNwCZC-rj0eV5OPg8nDFcKkQATW8Od-HWdkDSqJxW4RyrOzKpAIpG0qr8WivZ5SuwhIkLG0'
		);

		if (user) {
			return {
				message: `Auth url`,
				data: user,
				statusCode: 200,
			};
		} else {
			return {
				message: `Could not get auth url`,
				statusCode: 404,
			};
		}
	}

	async refreshToken(request: Request) {
		const accessToken = request.body.access_token;
		const refreshToken = request.body.refresh_token;
		console.log('refreshToken', accessToken, refreshToken);

		const user = await this.spotifyApi.refreshAccessToken(
			accessToken,
			refreshToken
		);

		if (user) {
			return {
				message: `Auth url`,
				data: user,
				statusCode: 200,
			};
		} else {
			return {
				message: `Could not get auth url`,
				statusCode: 404,
			};
		}
	}
}
