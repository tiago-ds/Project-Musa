import AuthControl from '../auth/control/authControl';
import ChallengeControl from '../challenge/control/challengeControl';
import UserControl from '../user/control/userControl';
import { OperationType } from '../models/OperationType';
import { User } from '../user/models/User';
import { Credentials } from '../auth/models/Credentials';
import { Challenge } from '../challenge/models/Challenge';

export class Facade {
	userControl: UserControl;
	authControl: AuthControl;
	challengeControl: ChallengeControl;
	constructor() {
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

	async handleRequest<T>(operationType: OperationType, data: T) {
		switch (operationType) {
			case OperationType.GET_USER:
				return await this.userControl.getUser<T>(data);
			case OperationType.GET_USERS:
				return await this.userControl.getUsers<T>(data);
			case OperationType.CREATE_USER:
				return await this.userControl.createUser<T>(data);
			case OperationType.UPDATE_USER:
				return await this.userControl.updateUser<T>(data);
			case OperationType.DELETE_USER:
				return await this.userControl.deleteUser<T>(data);
			case OperationType.AUTH_CODE_GRANT:
				return await this.authControl.getCredentials<T>(data);
			case OperationType.REFRESH_TOKEN:
				return await this.authControl.refreshToken<T>(data);
			case OperationType.AUTHORIZE_URL:
				return await this.authControl.getAuthorizeUrl<T>(data);
			case OperationType.CREATE_CHALLENGE:
				return await this.challengeControl.createChallenge<T>(data);
			case OperationType.LOGIN:
				return await this.authControl.login<T>(data);
			default:
				break;
		}
	}
}
