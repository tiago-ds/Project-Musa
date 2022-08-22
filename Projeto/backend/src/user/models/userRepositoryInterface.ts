import { User } from './User';

export interface UserRepositoryInterface {
	createUser(user: User): Promise<boolean>;
	getUser(userUuid: string): Promise<object>;
	getUsers(userIdList: Array<string>): Promise<Array<Object>>;
	updateUser(userId: string, user: User): Promise<boolean>;
	deleteUser(userUuid: string): Promise<boolean>;
}
