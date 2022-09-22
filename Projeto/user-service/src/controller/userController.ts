import { NextFunction, Response, Request } from 'express';
import { UserService } from '../service/userService';

export default class UserController {
	userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	async getMe(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const access_token = req.headers.authorization;
		const response = await this.userService.getMe(access_token);

		res.status(response.statusCode).json(response.data);
	}

	async getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userIds = req.body.userIds;
		const response = await this.userService.getUsers(userIds);

		res.status(response.statusCode).json(response.data);
	}

	async getUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userId = req.params.id;
		const response = await this.userService.getUser(userId);

		res.status(response.statusCode).json(response.data);
	}

	async createUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const user = req.body;
		const response = await this.userService.createUser(user);

		res.status(response.statusCode).json(response.data);
	}

	async updateUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const user = req.body;
		const response = await this.userService.updateUser(user);

		res.status(response.statusCode).json(response.data);
	}

	async deleteUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userId = req.params.id;
		const response = await this.userService.deleteUser(userId);

		res.status(response.statusCode).json(response.data);
	}
}
