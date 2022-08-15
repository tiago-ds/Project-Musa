import { NextFunction, Response, Request } from 'express';
import Facade from '../models/facades/facade';
import { MusaResponse } from '../models/Response';
import { User } from '../models/User';

export default class UserController {
	facade: Facade;

	constructor() {
		this.facade = new Facade();
	}

	handleRequest(req: Request, res: Response, next: NextFunction): void {
		this.facade.handleRequest(req).then((response: MusaResponse<User>) => {
			res.status(response.statusCode).json(response);
		});
	}
}
