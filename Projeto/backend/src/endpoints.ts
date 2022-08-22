import express from 'express';
import UserRoutes from './user/userRoutes';
import dotevn from 'dotenv';
import AuthRoutes from './auth/authRoutes';
import ChallengeRoutes from './challenge/challengeRoutes';

dotevn.config();

const app = express();
app.use(express.json());

const userRoutes = new UserRoutes(app);
const authRoutes = new AuthRoutes(app);
const challengeRoutes = new ChallengeRoutes(app);

app.listen(process.env.PORT || 5000, () => {
	console.log(
		`O servidor está escutando em http://localhost:${
			process.env.PORT || 5000
		}`
	);
});
