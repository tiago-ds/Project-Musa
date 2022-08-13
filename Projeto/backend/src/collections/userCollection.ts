import { UserRepositoryFirebase } from '../repositories/userRepositoryFirebase';

export default class UserCollection {
	private userRepository: UserRepositoryFirebase;
	constructor() {
		this.userRepository = new UserRepositoryFirebase();
	}
	// createUser(user: User): void {
	// 	res.json({ message: 'response' });
	// }
	getUser(userId: string): void {
		this.userRepository.getUser(userId);
	}
	// getUsers(req: Request, res: Response, next: NextFunction): void {
	// 	res.json({ message: 'response' });
	// }
	// updateUser(req: Request, res: Response, next: NextFunction): void {
	// 	res.json({ message: 'response' });
	// }
	// deleteUser(req: Request, res: Response, next: NextFunction): void {
	// 	res.json({ message: 'response' });
	// }
}
