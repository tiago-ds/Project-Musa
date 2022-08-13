import { UserData } from './UserData';

export interface User {
	id: string;
	name: string;
	email: string;
	profilePictureUrl: string;
	lastChallenges: Array<string>;
	friends: Array<UserData>;
}
