import AuthControl from '../auth/control/authControl';
import ChallengeControl from '../challenge/control/challengeControl';
import UserControl from '../user/control/userControl';
import { OperationType } from '../models/OperationType';
import { User } from '../user/models/User';
import { Credentials } from '../auth/models/Credentials';
import { Challenge } from '../challenge/models/Challenge';
import dotevn from 'dotenv';

export class Facade {
	userControl: UserControl;
	authControl: AuthControl;
	challengeControl: ChallengeControl;

	private static _instance: Facade;

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}

	constructor() {
		dotevn.config();

		this.userControl = new UserControl();
		this.authControl = new AuthControl();
		this.challengeControl = new ChallengeControl();
	}

	async getUser(userId: string) {
		return await this.userControl.getUser(userId);
	}

	async getUsers(userIds: string[]) {
		return await this.userControl.getUsers(userIds);
	}

	async createUser(user: User) {
		return await this.userControl.createUser(user);
	}

	async updateUser(user: User) {
		return await this.userControl.updateUser(user);
	}

	async deleteUser(userId: string) {
		return await this.userControl.deleteUser(userId);
	}

	async getCredentials(code: string) {
		return await this.authControl.getCredentials(code);
	}

	async refreshToken(credentials: Credentials) {
		return await this.authControl.refreshToken(credentials);
	}

	async authorizeUrl(redirectUri: string) {
		return await this.authControl.getAuthorizeUrl(redirectUri);
	}

	async login(credentials: Credentials) {
		return await this.authControl.login(credentials);
	}

	async createChallenge(challenge: Challenge) {
		return await this.challengeControl.createChallenge(challenge);
	}

	async refreshChallenge(challengeId: string) {
		return await this.challengeControl.refreshChallenge(challengeId);
	}

	async getMe(access_token: string) {
		return await this.userControl.getMe(access_token);
	}

	async joinChallenge(challengeId: string, userId: string, userName: string, pictureUrl: string ) {
		return await this.challengeControl.joinChallenge(
			challengeId,
			userId,
			userName,
			pictureUrl
		);
	}
}

export const FacadeInstance = Facade.Instance;
