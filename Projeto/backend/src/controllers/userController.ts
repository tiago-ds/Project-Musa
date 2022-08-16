import { NextFunction, Response, Request } from 'express';
import { Facade } from '../facades/facade';
import { OperationType } from '../models/OperationType';
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
		const operation = OperationType.GET_USERS;
		const userIds = req.body.userIds;

		const response = await this.facade.handleRequest<string[]>(
			operation,
			userIds
		);
		res.status(response.statusCode).json(response.data);
	}

	async getUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operation = OperationType.GET_USER;
		const userId = req.params.id;

		const response = await this.facade.handleRequest<string>(
			operation,
			userId
		);

		res.status(response.statusCode).json(response.data);
	}

	async createUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operation = OperationType.CREATE_USER;
		const user = req.body;

		const response = await this.facade.handleRequest<User>(operation, user);
		res.status(response.statusCode).json(response.data);
	}

	async updateUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operation = OperationType.UPDATE_USER;
		const user = req.body;

		const response = await this.facade.handleRequest<User>(operation, user);
		res.status(response.statusCode).json(response.data);
	}

	async deleteUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operation = OperationType.DELETE_USER;
		const userId = req.params.id;

		const response = await this.facade.handleRequest<string>(
			operation,
			userId
		);
		res.status(response.statusCode).json(response.data);
	}
}
