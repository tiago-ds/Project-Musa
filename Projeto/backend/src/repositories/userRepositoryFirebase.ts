import { UserRepositoryInterface } from '../interfaces/userRepositoryInterface';
import { FirebaseApiFacade } from '../models/facades/firebaseApiFacade';
import { User } from '../models/User';

export class UserRepositoryFirebase implements UserRepositoryInterface {
	private readonly firebaseApi: FirebaseApiFacade<User>;

	constructor() {
		this.firebaseApi = new FirebaseApiFacade<User>('users');
	}

	createUser(user: User): boolean {
		return true;
		//return this.firebaseApi.save(user);
	}
	getUser(userUuid: string): any {
		return this.firebaseApi.get(userUuid);
	}
	updateUser(user: User): any {
		return {};
	}
	deleteUser(userUuid: string): boolean {
		return true;
	}
}
