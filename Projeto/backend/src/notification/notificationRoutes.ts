import { Express } from 'express';
import NotificationController from './controller/notificationController';
import IRoutes from '../interfaces/routesInterface';

export default class NotificationRoutes implements IRoutes {
	app: Express;
	baseRoute: string;
	notificationController: NotificationController;

	constructor(app: Express) {
		this.app = app;
		this.baseRoute = 'notification';
		this.notificationController = new NotificationController();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.app.post(`/${this.baseRoute}`, (req, res, next) =>
			this.notificationController.sendNotification(req, res)
		);

		this.app.delete(`/${this.baseRoute}`, (req, res, next) =>
			this.notificationController.readNotification(req, res)
		);

		this.app.get(`/${this.baseRoute}`, (req, res, next) =>
			this.notificationController.getNotifications(req, res)
		);
	}
}
