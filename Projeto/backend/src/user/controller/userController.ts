import { NextFunction, Response, Request } from 'express';
import { Facade } from '../../facades/facade';
import { OperationType } from '../../models/OperationType';
import { User } from '../models/User';

export default class UserController {
	facade: Facade;

	constructor() {
		this.facade = new Facade();
	}

	async getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userIds = req.body.userIds;
		const response = await this.facade.getUsers(userIds);

		res.status(response.statusCode).json(response.data);
	}

	async getUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userId = req.params.id;
		const response = await this.facade.getUser(userId);

		res.status(response.statusCode).json(response.data);
	}

	async createUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const user = req.body;
		const response = await this.facade.createUser(user);

		res.status(response.statusCode).json(response.data);
	}

	async updateUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const user = req.body;
		const response = await this.facade.updateUser(user);

		res.status(response.statusCode).json(response.data);
	}

	async deleteUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userId = req.params.id;
		const response = await this.facade.deleteUser(userId);

		res.status(response.statusCode).json(response.data);
	}
}
