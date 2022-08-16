import { Express } from 'express';
import UserController from '../controllers/userController';
import IRoutes from '../interfaces/routesInterface';

export default class UserRoutes implements IRoutes {
	app: Express;
	baseRoute: string;
	userController: UserController;

	constructor(app: Express) {
		this.app = app;
		this.baseRoute = 'user';
		this.userController = new UserController();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.app.get(
			`/${this.baseRoute}`,
			async (req, res, next) =>
				await this.userController.getUsers(req, res, next)
		);
		this.app.get(
			`/${this.baseRoute}/:id`,
			async (req, res, next) =>
				await this.userController.getUser(req, res, next)
		);
		this.app.post(
			`/${this.baseRoute}`,
			async (req, res, next) =>
				await this.userController.createUser(req, res, next)
		);
		this.app.patch(
			`/${this.baseRoute}/:id`,
			async (req, res, next) =>
				await this.userController.updateUser(req, res, next)
		);
		this.app.delete(
			`/${this.baseRoute}/:id`,
			async (req, res, next) =>
				await this.userController.deleteUser(req, res, next)
		);
	}
}
