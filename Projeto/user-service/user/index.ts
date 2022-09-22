import express from 'express';
import dotevn from 'dotenv';
import morgan from 'morgan';
import UserRoutes from './routes/userRoutes';

dotevn.config();

const app = express();
app.use(morgan('combined'));
app.use(express.json());

const userRoutes = new UserRoutes(app);

app.listen(process.env.PORT || 5008, () => {
	console.log(
		`O servidor de autenticação está escutando em http://localhost:${
			process.env.PORT || 5008
		}`
	);
});
