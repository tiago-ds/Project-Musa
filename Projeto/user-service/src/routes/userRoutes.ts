import { Express } from 'express';
import UserController from '../controller/userController';

export default class UserRoutes {
	app: Express;
	baseRoute: string;
	userController: UserController;

	constructor(app: Express) {
		this.app = app;
		this.userController = new UserController();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.app.get(
			`/me`,
			async (req, res, next) =>
				await this.userController.getMe(req, res, next)
		);
		this.app.get(
			`/`,
			async (req, res, next) =>
				await this.userController.getUsers(req, res, next)
		);
		this.app.get(
			`/:id`,
			async (req, res, next) =>
				await this.userController.getUser(req, res, next)
		);
		this.app.post(
			`/`,
			async (req, res, next) =>
				await this.userController.createUser(req, res, next)
		);
		this.app.put(
			`/:id`,
			async (req, res, next) =>
				await this.userController.updateUser(req, res, next)
		);
		this.app.delete(
			`/:id`,
			async (req, res, next) =>
				await this.userController.deleteUser(req, res, next)
		);
	}
}
