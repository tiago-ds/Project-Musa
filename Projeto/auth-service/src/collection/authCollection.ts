import { Credentials } from '../models/Credentials';
import { AuthRepositoryFirebase } from '../repository/authRepositoryFirebase';

export default class AuthCollection {
	private authRepository: AuthRepositoryFirebase;
	constructor() {
		this.authRepository = new AuthRepositoryFirebase();
	}
	async createCredentials(
		credentials: Credentials,
		id: string
	): Promise<boolean> {
		return await this.authRepository.createCredentials(credentials, id);
	}

	async updateCredentials(
		credentials: Credentials,
		id: string
	): Promise<boolean> {
		return await this.authRepository.updateCredentials(credentials, id);
	}

	async deleteCredentials(id: string): Promise<boolean> {
		return await this.authRepository.deleteCredentials(id);
	}

	async getCredentials(id: string): Promise<Credentials> {
		return await this.authRepository.getCredentials(id);
	}
}
