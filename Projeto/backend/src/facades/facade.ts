import AuthControl from '../controls/authControl';
import ChallengeControl from '../controls/challengeControl';
import UserControl from '../controls/userControl';
import { OperationType } from '../models/OperationType';

export class Facade {
	userControl: UserControl;
	authControl: AuthControl;
	challengeControl: ChallengeControl;
	constructor() {
		this.userControl = new UserControl();
		this.authControl = new AuthControl();
		this.challengeControl = new ChallengeControl();
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
