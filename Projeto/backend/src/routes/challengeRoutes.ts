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
		this.app.post(`/${this.baseRoute}`, (req, res, next) =>
			this.challengeController.createChallenge(req, res, next)
		);
	}
}
