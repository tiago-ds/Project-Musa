import { NotificationRepositoryFirebase } from '../repository/notificationRepositoryFirebase';
import { Notification } from '../models/Notification';
import { NotificationCollection } from '../collection/notificationCollection';
import { MusaResponse } from '../../models/Response';

export default class NotificationControl {
	private notificationCollection: NotificationCollection;
	constructor() {
		this.notificationCollection = new NotificationCollection(
			new NotificationRepositoryFirebase()
		);
	}
	async getNotifications(
		userId: string
	): Promise<MusaResponse<Notification[]>> {
		const notfications = await this.notificationCollection.getNotifications(
			userId
		);
		if (notfications) {
			return {
				data: notfications,
				statusCode: 200
			};
		} else {
			return {
				data: [],
				statusCode: 404
			};
		}
	}
	async readNotification(
		userId: string,
		notificationId: string
	): Promise<MusaResponse<boolean>> {
		const read = await this.notificationCollection.readNotification(
			userId,
			notificationId
		);

		if (read) {
			return {
				data: read,
				statusCode: 200
			};
		} else {
			return {
				data: false,
				statusCode: 404
			};
		}
	}
	async sendNotification(
		userId: string,
		notification: Notification
	): Promise<MusaResponse<boolean>> {
		const sent = await this.notificationCollection.sendNotification(
			userId,
			notification
		);

		if (sent) {
			return {
				data: sent,
				statusCode: 200
			};
		} else {
			return {
				data: false,
				statusCode: 404
			};
		}
	}
}
