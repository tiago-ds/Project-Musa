import { Credentials } from './../models/Credentials';
import { FirebaseApiFacade } from '../../facades/firebaseApiFacade';
import { AuthRepositoryInterface } from '../models/authRepositoryInterface';

export class AuthRepositoryFirebase implements AuthRepositoryInterface {
	private readonly firebaseApi: FirebaseApiFacade<Credentials>;

	constructor() {
		this.firebaseApi = new FirebaseApiFacade<Credentials>('credentials');
	}
	updateCredentials(credentials: Credentials, id: string): Promise<boolean> {
		return this.firebaseApi.save(credentials, id);
	}
	deleteCredentials(id: string): Promise<boolean> {
		return this.firebaseApi.delete(id);
	}
	getCredentials(id: string): Promise<Credentials> {
		return this.firebaseApi.get(id) as Promise<Credentials>;
	}

	async createCredentials(
		credentials: Credentials,
		id: string
	): Promise<boolean> {
		return this.firebaseApi.save(credentials, id);
	}
}
