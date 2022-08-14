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
		this.app.get(`/${this.baseRoute}`, (req, res, next) =>
			this.userController.getUsers(req, res, next)
		);
		this.app.get(`/${this.baseRoute}/:id`, (req, res, next) =>
			this.userController.getUser(req, res, next)
		);
		this.app.post(`/${this.baseRoute}`, (req, res, next) =>
			this.userController.createUser(req, res, next)
		);
		this.app.patch(`/${this.baseRoute}/:id`, (req, res, next) =>
			this.userController.updateUser(req, res, next)
		);
		this.app.delete(`/${this.baseRoute}/:id`, (req, res, next) =>
			this.userController.deleteUser(req, res, next)
		);
	}
}
