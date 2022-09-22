import { ChallengeData } from '../../challenge/models/ChallengeData';
import { UserData } from './UserData';

export interface User {
	id: string;
	name: string;
	email: string;
	profilePictureUrl: string;
	lastChallenges: Array<ChallengeData>;
	friends: Array<UserData>;
}
