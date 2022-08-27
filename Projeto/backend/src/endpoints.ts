import express from 'express';
import UserRoutes from './user/userRoutes';
import dotevn from 'dotenv';
import AuthRoutes from './auth/authRoutes';
import ChallengeRoutes from './challenge/challengeRoutes';
import cors from 'cors';
import morgan from 'morgan';

dotevn.config();

const allowlist = [
	'http://localhost:8100',
	'https://projeto-de-multimidia.web.app',
];

const corsOptionsDelegate = function (req, callback) {
	let corsOptions;
	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true };
	} else {
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(cors(corsOptionsDelegate));

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
