import { User } from '../models/User';

export interface UserRepositoryInterface {
	createUser(user: User): boolean;
	getUser(userUuid: string): any;
	updateUser(user: User): any;
	deleteUser(userUuid: string): boolean;
}
