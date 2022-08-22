import { Facade, FacadeInstance } from '../../facades/facade';
import { NextFunction, Response, Request } from 'express';
import { OperationType } from '../../models/OperationType';
import { Challenge } from '../models/Challenge';

export default class ChallengeController {
	facade: Facade;

	constructor() {
		this.facade = FacadeInstance;
	}

	async createChallenge(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const challenge = req.body;
		const response = await this.facade.createChallenge(challenge);

		res.status(response.statusCode).json(response.data);
	}
}
