import { NextFunction, Response, Request } from 'express';
import Facade from '../models/facades/facade';

export default class UserController {
	facade: Facade;

	constructor() {
		this.facade = new Facade();
	}

	createUser(req: Request, res: Response, next: NextFunction): void {
		res.json({ message: 'response' });
	}
	async getUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> {
		console.log(this);

		const response = await this.facade.handleRequest(req);
		res.json(response);
	}
	getUsers(req: Request, res: Response, next: NextFunction): void {
		res.json({ message: 'response' });
	}
	updateUser(req: Request, res: Response, next: NextFunction): void {
		res.json({ message: 'response' });
	}
	deleteUser(req: Request, res: Response, next: NextFunction): void {
		res.json({ message: 'response' });
	}
}
