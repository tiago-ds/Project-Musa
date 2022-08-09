import express from 'express';
import Facade from './facade';
const app = express();

const facade = new Facade(app);
facade.init();

app.listen(5000, () => {
	console.log(`O servidor está escutando em http://localhost:${5000}`);
});
