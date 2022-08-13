import { Request } from 'express';
import UserCollection from '../collections/userCollection';

export default class UserControl {
	userCollection: UserCollection;
	constructor() {
		this.userCollection = new UserCollection();
	}

	async handleUserRequest(request: Request) {
		if (request.method === 'GET') {
			if (request.route.path === '/user') {
				return this.userCollection.getUser(request.params.id);
			} else if (request.route.path === '/user/:id') {
				return await this.userCollection.getUser(request.params.id);
			}
		}
		// } else if(request.method === 'GET') {
		// 	this.getUser(request);
		// } else if(request.method === 'PUT') {
		// 	this.updateUser(request);
		// } else if(request.method === 'DELETE') {
		// 	this.deleteUser(request);
		// }
	}
}
