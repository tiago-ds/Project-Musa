import { Express } from 'express-serve-static-core';

import ChallengeController from './controllers/challengeController';
import ErrorController from './controllers/errorController';
import UserController from './controllers/userController';
import LoginController from './controllers/loginController';

export default class Facade {
	app: Express;

	private readonly errorController = new ErrorController();
	private readonly challengeController = new ChallengeController();
	private readonly userController = new UserController();
	private readonly loginController = new LoginController();

	constructor(app: Express) {
		this.app = app;
	}

	init() {
		this.app.use(this.handleRequest);
		this.app.use(this.errorController.handleError);
	}

	handleRequest(req, res, next) {
		console.log('Handling request...');
		next();
	}
}
