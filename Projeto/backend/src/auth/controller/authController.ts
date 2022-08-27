import { NextFunction, Response, Request } from 'express';
import { OperationType } from '../../models/OperationType';
import { Credentials } from '../models/Credentials';
import { Facade, FacadeInstance } from '../../facades/facade';

export default class AuthController {
	facade: Facade;

	constructor() {
		this.facade = FacadeInstance;
	}

	async getAuthorizeUrl(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const redirectUri = req.query.redirectUri as string;
		const response = await this.facade.authorizeUrl(redirectUri);

		res.status(response.statusCode).json(response.data);
	}

	async getCredentials(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const credentials = req.body;
		const response = await this.facade.getCredentials(credentials);

		res.status(response.statusCode).json(response.data);
	}

	async refreshToken(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const credentials = req.body;
		const response = await this.facade.refreshToken(credentials);

		res.status(response.statusCode).json(response.data);
	}

	async login(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const credentials = req.body;
		const response = await this.facade.login(credentials);

		res.status(response.statusCode).json(response.data);
	}
}
