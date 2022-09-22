import express from 'express';
import dotevn from 'dotenv';
import UserRoutes from './routes/userRoutes';

dotevn.config();

const app = express();
app.use(express.json());

const userRoutes = new UserRoutes(app);

app.listen(process.env.PORT || 5008, () => {
	console.log(
		`O serviço de usuário está escutando em http://localhost:${
			process.env.PORT || 5008
		}`
	);
});
