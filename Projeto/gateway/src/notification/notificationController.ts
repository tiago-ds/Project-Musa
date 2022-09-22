import { NextFunction, Response, Request } from 'express';
import axios from 'axios';

const endpoint = 'http://localhost:5001/notification';
import { v4 } from 'uuid';

export async function getNotifications(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const userId = req.query.userId as string;
		const notifications = await axios.get(`${endpoint}/?userId=${userId}`);
		res.status(notifications.status).json(notifications.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function readNotification(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const userId = req.query.userId as string;
		const notificationId = req.query.notificationId as string;
		const result = await axios.delete(
			`${endpoint}/?userId=${userId}&notificationId=${notificationId}`
		);
		res.status(result.status).json(result.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function sendNotification(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const userId = req.query.userId as string;
		const result = await axios.post(`${endpoint}/?userId=${userId}`, {
			...req.body,
			id: v4()
		});
		res.status(result.status).json(result.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
