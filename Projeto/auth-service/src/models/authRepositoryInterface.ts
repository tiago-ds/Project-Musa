import { Credentials } from './Credentials';

export interface AuthRepositoryInterface {
	createCredentials(credentials: Credentials, id: string): Promise<boolean>;
	updateCredentials(credentials: Credentials, id: string): Promise<boolean>;
	deleteCredentials(id: string): Promise<boolean>;
	getCredentials(id: string): Promise<Credentials>;
}
