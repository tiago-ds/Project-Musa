import { NextFunction, Response, Request } from 'express';
import Facade from '../models/facades/facade';
import { MusaResponse } from '../models/Response';
import { User } from '../models/User';

export default class UserController {
	facade: Facade;

	constructor() {
		this.facade = new Facade();
	}

	createUser(req: Request, res: Response, next: NextFunction): void {
		this.facade.handleRequest(req).then((response: MusaResponse<User>) => {
			res.status(response.statusCode).json(response);
		});
	}
	getUser(req: Request, res: Response, next: NextFunction): void {
		this.facade.handleRequest(req).then((response: MusaResponse<User>) => {
			res.status(response.statusCode).json(response);
		});
	}

	getUsers(req: Request, res: Response, next: NextFunction): void {
		this.facade.handleRequest(req).then((users: User[]) => {
			res.json(users);
		});
	}
	updateUser(req: Request, res: Response, next: NextFunction): void {
		this.facade.handleRequest(req).then((user: User) => {
			res.json(user);
		});
	}

	deleteUser(req: Request, res: Response, next: NextFunction): void {
		this.facade.handleRequest(req).then((user: User) => {
			res.json(user);
		});
	}
}
