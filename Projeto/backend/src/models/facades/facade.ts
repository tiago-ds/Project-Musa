import { Request } from 'express';
import AuthControl from '../../controls/authControl';
import UserControl from '../../controls/userControl';

export default class Facade {
	userControl: UserControl;
	authControl: AuthControl;
	constructor() {
		this.userControl = new UserControl();
		this.authControl = new AuthControl();
	}

	async handleRequest(request: Request) {
		if (request.route.path.match(/\/user.*/)) {
			return await this.userControl.handleUserRequest(request);
		} else if (request.route.path.match(/\/challenge\/.*/)) {
		} else if (request.route.path.match(/\/auth.*/)) {
			return await this.authControl.handleAuthRequest(request);
		}
	}
}
