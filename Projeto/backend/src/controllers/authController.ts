import { NextFunction, Response, Request } from 'express';
import { OperationType } from '../models/OperationType';
import { Credentials } from '../models/Credentials';
import { Facade } from '../facades/facade';

export default class AuthController {
	facade: Facade;

	constructor() {
		this.facade = new Facade();
	}

	async getAuthorizeUrl(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operation = OperationType.AUTHORIZE_URL;
		const redirectUri = req.body.redirect_uri;

		const response = await this.facade.handleRequest<string>(
			operation,
			redirectUri
		);
		res.status(response.statusCode).json(response.data);
	}

	async getCredentials(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operation = OperationType.AUTH_CODE_GRANT;
		const code = req.body.code;

		const response = await this.facade.handleRequest<string>(
			operation,
			code
		);

		res.status(response.statusCode).json(response.data);
	}

	async refreshToken(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operation = OperationType.REFRESH_TOKEN;
		const credentials = req.body;

		const response = await this.facade.handleRequest<Credentials>(
			operation,
			credentials
		);
		res.status(response.statusCode).json(response.data);
	}

	async login(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operation = OperationType.LOGIN;
		const credentials = req.body;

		const response = await this.facade.handleRequest<Credentials>(
			operation,
			credentials
		);
		res.status(response.statusCode).json(response.data);
	}
}
