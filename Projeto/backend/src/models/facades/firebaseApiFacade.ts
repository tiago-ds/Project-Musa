import { DatabaseCommunicationInterface } from '../../interfaces/databaseCommunicationInterface';
import * as firebaseAdmin from 'firebase-admin';

export class FirebaseApiFacade<T> implements DatabaseCommunicationInterface {
	public readonly firestore: FirebaseFirestore.Firestore;
	private readonly objectRef: FirebaseFirestore.CollectionReference<T>;

	constructor(objectTypeRef: string) {
		if (!firebaseAdmin.apps.length) {
			this.initializeFirebase();
		}
		this.firestore = firebaseAdmin.firestore();
		this.objectRef = this.firestore.collection(
			objectTypeRef
		) as FirebaseFirestore.CollectionReference<T>;
	}

	private initializeFirebase() {
		firebaseAdmin.initializeApp({
			credential: firebaseAdmin.credential.cert({
				projectId: process.env.FIREBASE_PROJECT_ID,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				privateKey: process.env.FIREBASE_PRIVATE_KEY,
			}),
			databaseURL: 'musa-d0f4f.firebaseio.com',
		});
	}

	async save(object: T, id: string): Promise<boolean> {
		await this.objectRef.doc(id).set(object);
		return true;
	}
	async get(id: string): Promise<Object> {
		return await (await this.objectRef.doc(id).get()).data();
	}
	update(object: Object): Object {
		throw new Error('Method not implemented.');
	}
	delete(id: string): Object {
		throw new Error('Method not implemented.');
	}
}
