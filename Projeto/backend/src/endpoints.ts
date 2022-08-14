import express from 'express';
import UserRoutes from './routes/userRoutes';
import dotevn from 'dotenv';

dotevn.config();

const app = express();
app.use(express.json());

const userRoutes = new UserRoutes(app);

app.listen(5000, () => {
	console.log(`O servidor está escutando em http://localhost:${5000}`);
});
