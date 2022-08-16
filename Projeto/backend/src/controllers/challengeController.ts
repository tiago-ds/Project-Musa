import { Facade } from '../facades/facade';
import { NextFunction, Response, Request } from 'express';
import { OperationType } from '../models/OperationType';
import { Challenge } from '../models/Challenge';

export default class ChallengeController {
	facade: Facade;

	constructor() {
		this.facade = new Facade();
	}

	async createChallenge(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const operationType = OperationType.CREATE_CHALLENGE;
		const challenge = req.body;

		const response = await this.facade.handleRequest<Challenge>(
			operationType,
			challenge
		);
		res.status(response.statusCode).json(response.data);
	}
}
