import { NextFunction, Response, Request } from 'express';
import axios from 'axios';

const endpoint = 'http://localhost:5001/challenge';

export async function createChallenge(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const challenge = req.body;
		const response = await axios.post(`${endpoint}/`, {
			...challenge
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function refreshChallenge(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const challengeId = req.params.id;
		const response = await axios.get(`${endpoint}/${challengeId}`);

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function joinChallenge(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const challengeId: string = req.params.id;

		const response = await axios.put(`${endpoint}/${challengeId}`, {
			...req.body
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
