import { UserData } from '../../user/models/UserData';
import { NotificationType } from './NotificationType';
import { Challenge } from '../../challenge/models/Challenge';

export interface Notification {
	id: string;
	read: boolean;
	message: string;
	type: NotificationType;
	userData?: UserData;
	challenge?: Challenge;
}
