import { Express } from 'express';
import AuthController from './controller/authController';
import UserController from '../user/controller/userController';
import IRoutes from '../interfaces/routesInterface';

export default class AuthRoutes implements IRoutes {
	app: Express;
	baseRoute: string;
	authController: AuthController;

	constructor(app: Express) {
		this.app = app;
		this.baseRoute = 'auth';
		this.authController = new AuthController();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.app.get(`/${this.baseRoute}/auth_url`, (req, res, next) =>
			this.authController.getAuthorizeUrl(req, res, next)
		);
		this.app.post(`/${this.baseRoute}/credentials`, (req, res, next) =>
			this.authController.getCredentials(req, res, next)
		);
		this.app.post(`/${this.baseRoute}/refresh_token`, (req, res, next) =>
			this.authController.refreshToken(req, res, next)
		);
		this.app.post(`/${this.baseRoute}/login`, (req, res, next) =>
			this.authController.login(req, res, next)
		);
	}
}
