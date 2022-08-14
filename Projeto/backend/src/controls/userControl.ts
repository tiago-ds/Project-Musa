import { Request } from 'express';
import UserCollection from '../collections/userCollection';

export default class UserControl {
	userCollection: UserCollection;
	handlers = {
		GET: {
			'/user': this.getUsers.bind(this),
			'/user/:id': this.getUser.bind(this),
		},
		POST: {
			'/user': this.createUser.bind(this),
		},
		PATCH: {
			'/user/:id': this.updateUser.bind(this),
		},
		DELETE: {
			'/user/:id': this.deleteUser.bind(this),
		},
	};
	constructor() {
		this.userCollection = new UserCollection();
	}

	async handleUserRequest(request: Request) {
		const handler = this.handlers[request.method][request.route.path];

		if (handler) {
			return await handler(request);
		} else {
			return {
				message: 'No handler found for this request',
			};
		}
	}

	async getUser(request: Request) {
		const user = await this.userCollection.getUser(request.params.id);

		if (user) {
			return {
				message: `User with id ${request.params.id} found`,
				data: user,
				statusCode: 200,
			};
		} else {
			return {
				message: `User with id ${request.params.id} not found`,
				statusCode: 404,
			};
		}
	}

	async getUsers(request: Request) {
		console.log(request.body);

		const user = await this.userCollection.getUsers(request.body.userIds);

		if (user) {
			return {
				message: `User with id ${request.params.id} found`,
				data: user,
				statusCode: 200,
			};
		} else {
			return {
				message: `User with id ${request.params.id} not found`,
				statusCode: 404,
			};
		}
	}

	async createUser(request: Request) {
		const user = await this.userCollection.createUser(request.body);

		if (user) {
			return {
				message: `User with id ${request.params.id} found`,
				data: user,
				statusCode: 200,
			};
		} else {
			return {
				message: `User with id ${request.params.id} not found`,
				statusCode: 404,
			};
		}
	}

	async updateUser(request: Request) {
		const user = await this.userCollection.updateUser(
			request.params.id,
			request.body
		);

		if (user) {
			return {
				message: `User with id ${request.params.id} found`,
				data: user,
				statusCode: 200,
			};
		} else {
			return {
				message: `User with id ${request.params.id} not found`,
				statusCode: 404,
			};
		}
	}

	async deleteUser(request: Request) {
		const user = await this.userCollection.deleteUser(request.params.id);

		if (user) {
			return {
				message: `User with id ${request.params.id} found`,
				data: user,
				statusCode: 200,
			};
		} else {
			return {
				message: `User with id ${request.params.id} not found`,
				statusCode: 404,
			};
		}
	}
}
