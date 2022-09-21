import { FirebaseApiFacade } from '../../facades/firebaseApiFacade';
import { NotificationRepositoryInterface } from './../models/notificationRepositoryInterface';
import { Notification } from './../models/Notification';

export class NotificationRepositoryFirebase
	implements NotificationRepositoryInterface
{
	private readonly firebaseApi: FirebaseApiFacade<Notification>;

	constructor() {
		this.firebaseApi = new FirebaseApiFacade<Notification>('notifications');
	}

	async getNotifications(userId: string): Promise<Notification[]> {
		return (await this.firebaseApi.getSubCollection(
			userId,
			'notifications'
		)) as unknown as Promise<Notification[]>;
	}

	async readNotification(
		userId: string,
		notificationId: string
	): Promise<boolean> {
		return await this.firebaseApi.deleteSubCollection(
			userId,
			'notifications',
			notificationId
		);
	}

	async sendNotification(
		userId: string,
		notification: Notification
	): Promise<boolean> {
		return await this.firebaseApi.saveSubCollection(
			userId,
			'notifications',
			notification.id,
			notification
		);
	}
}
