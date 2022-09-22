import { NextFunction, Response, Request } from 'express';
import axios from 'axios';

const endpoint = 'http://localhost:5008/user';
import { v4 } from 'uuid';

export async function getMe(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const access_token = req.headers.authorization;
		const response = await axios.get(`${endpoint}/me`, {
			headers: {
				Authorization: access_token
			}
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function getUsers(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const userIds = req.body.userIds;
		const response = await axios.get(`${endpoint}/`, {
			...req.body
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function getUser(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const userId = req.params.id;
		const response = await axios.get(`${endpoint}/${userId}`);

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function createUser(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const user = req.body;
		const response = await axios.post(`${endpoint}/`, {
			...req.body
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function updateUser(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const user = req.body;
		const response = await axios.put(`${endpoint}/`, {
			...req.body
		});

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function deleteUser(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const userId = req.params.id;
		const response = await axios.delete(`${endpoint}/${userId}`);

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
