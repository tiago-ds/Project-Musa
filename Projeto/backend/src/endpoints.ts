import express from 'express';
import dotenv from 'dotenv';
import ChallengeRoutes from './challenge/challengeRoutes';
import cors from 'cors';
import morgan from 'morgan';
import NotificationRoutes from './notification/notificationRoutes';

dotenv.config();

const app = express();
app.use(morgan('combined'));
app.use(express.json());

const challengeRoutes = new ChallengeRoutes(app);
const notificationRoute = new NotificationRoutes(app);

app.listen(process.env.PORT || 5001, () => {
	console.log(
		`O servidor está escutando em http://localhost:${
			process.env.PORT || 5001
		}`
	);
});
