import { UserData } from '../../user/models/UserData';
import { NotificationType } from './NotificationType';

export interface Notification {
	id: string;
	read: boolean;
	message: string;
	type: NotificationType;
	userData: UserData;
	challengeId: string;
}
