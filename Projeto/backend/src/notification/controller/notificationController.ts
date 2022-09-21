import NotificationControl from '../control/notificationControl';
import { Response, Request } from 'express';
import { Notification } from '../models/Notification';
import { v4 } from 'uuid';

export default class NotificationController {
	private notificationControl: NotificationControl;
	constructor() {
		this.notificationControl = new NotificationControl();
	}
	async getNotifications(req: Request, res: Response): Promise<void> {
		const userId = req.query.userId as string;
		console.log(userId);
		const notifications = await this.notificationControl.getNotifications(
			userId
		);
		res.status(notifications.statusCode).json(notifications.data);
	}

	async readNotification(req: Request, res: Response): Promise<void> {
		const userId = req.query.userId as string;
		const notificationId = req.query.notificationId as string;
		const result = await this.notificationControl.readNotification(
			userId,
			notificationId
		);
		res.status(result.statusCode).json(result.data);
	}

	async sendNotification(req: Request, res: Response): Promise<void> {
		const userId = req.query.userId as string;
		const notification = {
			...req.body,
			id: v4()
		} as unknown as Notification;
		const result = await this.notificationControl.sendNotification(
			userId,
			notification
		);
		res.status(result.statusCode).json(result.data);
	}
}
