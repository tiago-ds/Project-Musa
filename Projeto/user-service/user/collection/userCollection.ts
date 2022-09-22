import { User } from '../models/User';
import { UserRepositoryFirebase } from '../repository/userRepositoryFirebase';

export default class UserCollection {
	private userRepository: UserRepositoryFirebase;
	constructor() {
		this.userRepository = new UserRepositoryFirebase();
	}
	async createUser(user: User): Promise<boolean> {
		return await this.userRepository.createUser(user);
	}
	async getUser(userId: string): Promise<Object> {
		return await this.userRepository.getUser(userId);
	}
	async getUsers(userIdList: Array<string>): Promise<Object> {
		return await this.userRepository.getUsers(userIdList);
	}
	async updateUser(userId: string, user: User): Promise<boolean> {
		return await this.userRepository.updateUser(userId, user);
	}
	async deleteUser(userId: string): Promise<boolean> {
		return await this.userRepository.deleteUser(userId);
	}
}
