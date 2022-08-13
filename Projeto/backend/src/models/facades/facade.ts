import { Request } from 'express';
import UserControl from '../../controls/userControl';

export default class Facade {
	handleRequest(request: Request) {
		if (request.route.path.match(/\/user\/.*/)) {
			return new UserControl().handleUserRequest(request);
		}
	}
}
