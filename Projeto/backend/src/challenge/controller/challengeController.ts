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

	async refreshChallenge(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const challengeId = req.params.id;
		const response = await this.facade.refreshChallenge(challengeId);

		res.status(response.statusCode).json(response.data);
	}

	async joinChallenge(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const challengeId: string = req.params.id;
		const userId: string = req.body.user.id;
		const userName: string = req.body.user.display_name;
		
		const response = await this.facade.joinChallenge(challengeId, userId, userName);

		res.status(response.statusCode).json(response.data);
	}
}
