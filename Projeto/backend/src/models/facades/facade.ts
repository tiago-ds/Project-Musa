import { Request } from 'express';
import UserControl from '../../controls/userControl';

export default class Facade {
	userControl: UserControl;
	constructor() {
		this.userControl = new UserControl();
	}

	async handleRequest(request: Request) {
		if (request.route.path.match(/\/user.*/)) {
			return await this.userControl.handleUserRequest(request);
		} else if (request.route.path.match(/\/challenge\/.*/)) {
		} else if (request.route.path.match(/\/auth\/.*/)) {
		}
	}
}
