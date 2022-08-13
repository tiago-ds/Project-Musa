import express, { Express } from 'express';
import UserController from '../controllers/userController';

export default class UserRoutes {
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
		this.app.post(`/${this.baseRoute}/:id`, (req, res, next) =>
			this.userController.createUser(req, res, next)
		);
		this.app.put(`/${this.baseRoute}/:id`, (req, res, next) =>
			this.userController.updateUser(req, res, next)
		);
		this.app.delete(`/${this.baseRoute}/:id`, (req, res, next) =>
			this.userController.deleteUser(req, res, next)
		);
	}
}
