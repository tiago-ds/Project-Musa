import express from 'express';
import dotevn from 'dotenv';
import AuthRoutes from './routes/authRoutes';
import cors from 'cors';
import morgan from 'morgan';

dotevn.config();

const app = express();
app.use(morgan('combined'));
app.use(express.json());

const authRoutes = new AuthRoutes(app);

app.listen(process.env.PORT || 5000, () => {
	console.log(
		`O servidor de autenticação está escutando em http://localhost:${
			process.env.PORT || 5000
		}`
	);
});
