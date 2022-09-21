import { Notification } from '../models/Notification';
import { NotificationRepositoryInterface } from '../models/notificationRepositoryInterface';

export class NotificationCollection {
	private readonly notificationRepository: NotificationRepositoryInterface;

	constructor(notificationRepository: NotificationRepositoryInterface) {
		this.notificationRepository = notificationRepository;
	}

	async getNotifications(userId: string): Promise<Notification[]> {
		return await this.notificationRepository.getNotifications(userId);
	}

	async readNotification(
		userId: string,
		notificationId: string
	): Promise<boolean> {
		return await this.notificationRepository.readNotification(
			userId,
			notificationId
		);
	}

	async sendNotification(
		userId: string,
		notification: Notification
	): Promise<boolean> {
		return await this.notificationRepository.sendNotification(
			userId,
			notification
		);
	}
}
