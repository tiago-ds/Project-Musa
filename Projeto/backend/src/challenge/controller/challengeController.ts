import { Facade, FacadeInstance } from '../../facades/facade';
import { NextFunction, Response, Request } from 'express';
import { OperationType } from '../../models/OperationType';
import { Challenge } from '../models/Challenge';
import ChallengeControl from '../control/challengeControl';

export default class ChallengeController {
	facade: Facade;
	challengeControl: ChallengeControl;

	constructor() {
		this.challengeControl = new ChallengeControl();
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
		const pictureUrl: string = req.body.user.images[0].url;

		const response = await this.facade.joinChallenge(
			challengeId,
			userId,
			userName,
			pictureUrl
		);

		res.status(response.statusCode).json(response.data);
	}

	async searchArtist(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const searchTerm: string = req.params.term;
		const userId = req.query.id as string;

		const response = await this.challengeControl.searchArtist(
			userId,
			searchTerm
		);

		res.status(response.statusCode).json(response.data);
	}

	async history(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userId = req.params.id as string;

		const response = await this.challengeControl.history(userId);

		res.status(response.statusCode).json(response.data);
	}
}
