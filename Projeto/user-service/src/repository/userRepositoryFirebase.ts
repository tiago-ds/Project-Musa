import { UserRepositoryInterface } from '../models/userRepositoryInterface';
import { FirebaseApiFacade } from '../facades/firebaseApiFacade';
import { User } from '../models/User';

export class UserRepositoryFirebase implements UserRepositoryInterface {
	private readonly firebaseApi: FirebaseApiFacade<User>;

	constructor() {
		console.log('UserRepositoryFirebase');
		this.firebaseApi = new FirebaseApiFacade<User>('users');
	}

	async getUsers(userIdList: string[]): Promise<Object[]> {
		return this.firebaseApi.getAllFiltered('id', userIdList);
	}
	async createUser(user: User): Promise<boolean> {
		return this.firebaseApi.save(user, user.id);
	}
	async getUser(userId: string): Promise<Object> {
		return await this.firebaseApi.get(userId);
	}
	async updateUser(userId: string, user: User): Promise<boolean> {
		return await this.firebaseApi.update(userId, user);
	}
	async deleteUser(userId: string): Promise<boolean> {
		return await this.firebaseApi.delete(userId);
	}
}
