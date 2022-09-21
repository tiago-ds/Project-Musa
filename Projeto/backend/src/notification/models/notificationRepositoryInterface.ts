import { Notification } from './Notification';

export interface NotificationRepositoryInterface {
	getNotifications(userId: string): Promise<Notification[]>;
	readNotification(userId: string, notificationId: string): Promise<boolean>;
	sendNotification(
		userId: string,
		notification: Notification
	): Promise<boolean>;
}
