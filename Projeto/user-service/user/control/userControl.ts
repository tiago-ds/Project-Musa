import UserCollection from '../collection/userCollection';
import { User } from '../models/User';
import { MusaResponse } from '../../models/Response';
import { MusicServiceFactory } from '../../factories/musicServiceFactory';
import SpotifyApiFacade from '../../facades/spotifyApiFacade';

export default class UserControl {
	userCollection: UserCollection;
	musicServiceFactory = new MusicServiceFactory();
	musicStreamingApi: SpotifyApiFacade;

	constructor() {
		this.userCollection = new UserCollection();
		this.musicStreamingApi = this.musicServiceFactory.create('spotify');
	}

	async getMe(access_token: string): Promise<MusaResponse<User>> {
		const spotifyUser = (
			await this.musicStreamingApi.getProfileInfo(access_token, null)
		).body;
		const user = {
			...(await this.userCollection.getUser(spotifyUser.id)),
			...spotifyUser
		};
		if (user) {
			return {
				data: user,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async getUser<T>(userId: T): Promise<MusaResponse<User>> {
		const user = (await this.userCollection.getUser(
			userId as unknown as string
		)) as User;

		if (user) {
			return {
				data: user,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async getUsers<T>(userIds: T): Promise<MusaResponse<User[]>> {
		const users = (await this.userCollection.getUsers(
			userIds as unknown as string[]
		)) as User[];

		if (users) {
			return {
				data: users,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async createUser<T>(user: T): Promise<MusaResponse<string>> {
		const userCreated = await this.userCollection.createUser(
			user as unknown as User
		);

		if (userCreated) {
			return {
				data: (user as unknown as User).id,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async updateUser<T>(user: T): Promise<MusaResponse<boolean>> {
		const userId = (user as unknown as User).id;
		const userUpdated = await this.userCollection.updateUser(
			userId,
			user as unknown as User
		);

		if (userUpdated) {
			return {
				data: userUpdated,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}

	async deleteUser<T>(id: T): Promise<MusaResponse<boolean>> {
		const userDeleted = await this.userCollection.deleteUser(
			id as unknown as string
		);

		if (userDeleted) {
			return {
				data: userDeleted,
				statusCode: 200
			};
		} else {
			return {
				data: null,
				statusCode: 404
			};
		}
	}
}
