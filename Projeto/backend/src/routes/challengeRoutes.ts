import { Express } from 'express';
import ChallengeController from '../controllers/challengeController';
import IRoutes from '../interfaces/routesInterface';

export default class ChallengeRoutes implements IRoutes {
	app: Express;
	baseRoute: string;
	challengeController: ChallengeController;

	constructor(app: Express) {
		this.app = app;
		this.baseRoute = 'challenge';
		this.challengeController = new ChallengeController();
		this.initializeRoutes();
	}

	initializeRoutes() {
		// this.app.get(`/${this.baseRoute}`, (req, res, next) =>
		// 	this.challengeController.getUsers(req, res, next)
		// );
		// this.app.get(`/${this.baseRoute}/:id`, (req, res, next) =>
		// 	this.challengeController.getUser(req, res, next)
		// );
		// this.app.post(`/${this.baseRoute}/:id`, (req, res, next) =>
		// 	this.challengeController.createUser(req, res, next)
		// );
		// this.app.put(`/${this.baseRoute}/:id`, (req, res, next) =>
		// 	this.challengeController.updateUser(req, res, next)
		// );
		// this.app.delete(`/${this.baseRoute}/:id`, (req, res, next) =>
		// 	this.challengeController.deleteUser(req, res, next)
		// );
	}
}
