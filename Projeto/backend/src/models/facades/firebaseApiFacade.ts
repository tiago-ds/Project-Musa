import { DatabaseCommunicationInterface } from '../../interfaces/databaseCommunicationInterface';
import * as firebaseAdmin from 'firebase-admin';
var serviceAccount = require('D:/Tiago/Faculdade/APS/Project-Musa/Projeto/backend/firebaseKey.json');

export class FirebaseApiFacade<T> implements DatabaseCommunicationInterface {
	public readonly firestore: FirebaseFirestore.Firestore;
	private readonly objectRef: FirebaseFirestore.CollectionReference<T>;
	private readonly serviceAccount = {
		type: 'service_account',
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY,
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
		auth_uri: 'https://accounts.google.com/o/oauth2/auth',
		token_uri: 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url:
			'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
	};

	constructor(objectTypeRef: string) {
		if (!firebaseAdmin.apps.length) {
			firebaseAdmin.initializeApp();
		}
		this.firestore = firebaseAdmin.firestore();
		this.objectRef = this.firestore.collection(
			objectTypeRef
		) as FirebaseFirestore.CollectionReference<T>;
	}

	private initializeFirebase() {
		firebaseAdmin.initializeApp({
			credential: firebaseAdmin.credential.cert(serviceAccount),
		});
	}

	async save(object: T, id: string): Promise<boolean> {
		await this.objectRef.doc(id).set(object);
		return true;
	}
	async get(id: string): Promise<Object> {
		console.log(id);

		const object = await this.objectRef.doc(id).get();
		const data = await object.data();
		console.log();

		return await object.data();
	}
	update(object: Object): Object {
		throw new Error('Method not implemented.');
	}
	delete(id: string): Object {
		throw new Error('Method not implemented.');
	}
}
