import { Request } from 'express';
import UserControl from '../../controls/userControl';

export default class Facade {
	async handleRequest(request: Request) {
		if (request.route.path.match(/\/user\/.*/)) {
			return await new UserControl().handleUserRequest(request);
		}
	}
}
