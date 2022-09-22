import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import {
	getAuthorizeUrl,
	getCredentials,
	login,
	refreshToken
} from './auth/authController';
import {
	createChallenge,
	joinChallenge,
	refreshChallenge
} from './challenge/challengeController';
import {
	getNotifications,
	readNotification,
	sendNotification
} from './notification/notificationController';
import {
	createUser,
	deleteUser,
	getMe,
	getUser,
	getUsers,
	updateUser
} from './user/userController';

dotenv.config();

const allowlist = [
	'http://localhost:8100',
	'https://projeto-de-multimidia.web.app',
	'https://e7f8-179-238-220-119.sa.ngrok.io'
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

app.get('/auth/auth_url', getAuthorizeUrl);
app.post('/auth/credentials', getCredentials);
app.post('/auth/refresh_token', refreshToken);
app.post('/auth/login', login);

app.post('/challenge/', createChallenge);
app.get('/challenge/:id', refreshChallenge);
app.put('/challenge/:id', joinChallenge);

app.get('/notification/', getNotifications);
app.delete('/notification/', readNotification);
app.post('/notification/', sendNotification);

app.get('/user/me', getMe);
app.get('/user/', getUsers);
app.get('/user/:id', getUser);
app.get('/user/', createUser);
app.get('/user/:id', updateUser);
app.get('/user/:id', deleteUser);

app.listen(process.env.PORT || 5000, () => {
	console.log(
		`O gateway está escutando em http://localhost:${
			process.env.PORT || 5000
		}`
	);
});
