import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const endpoint = 'http://localhost:5003';

export async function getAuthorizeUrl(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const redirectUri = req.query.redirectUri as string;
	try {
		const response = await axios.get(
			`${endpoint}/auth/auth_url/?redirect_uri=${redirectUri}`
		);

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function getCredentials(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const response = await axios.post(`${endpoint}/auth/credentials`, {
			...req.body
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function refreshToken(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const response = await axios.post(`${endpoint}/auth/refresh_token`, {
			...req.body
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function login(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const response = await axios.post(`${endpoint}/auth/login`, {
			...req.body
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
