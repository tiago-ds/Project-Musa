import { NextFunction, Response, Request } from 'express';
import AuthService from '../service/authService';

export default class AuthController {
	authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	async getAuthorizeUrl(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const redirectUri = req.query.redirect_uri as string;
		console.log(req.query);
		console.log(req.params);

		const response = await this.authService.getAuthorizeUrl(redirectUri);

		res.status(response.statusCode).json(response.data);
	}

	async getCredentials(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const credentials = req.body;
		const response = await this.authService.getCredentials(credentials);

		res.status(response.statusCode).json(response.data);
	}

	async refreshToken(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const credentials = req.body;
		console.log(req.body);

		const response = await this.authService.refreshToken(credentials);

		res.status(response.statusCode).json(response.data);
	}

	async login(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const credentials = req.body;
		const response = await this.authService.login(credentials);

		res.status(response.statusCode).json(response.data);
	}
}
