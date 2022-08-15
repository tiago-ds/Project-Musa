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
		return (await await this.objectRef.doc(id).set(object)) != null;
	}
	async get(id: string): Promise<Object> {
		return await (await this.objectRef.doc(id).get()).data();
	}

	async getAllFiltered(
		field: string,
		list: Array<string | number>
	): Promise<Array<Object>> {
		return await (
			await this.objectRef.where(field, 'in', list).get()
		).docs.map((doc) => doc.data());
	}

	async update(id: string, partialUser: any): Promise<boolean> {
		return (await this.objectRef.doc(id).update(partialUser)) != null;
	}
	async delete(id: string): Promise<boolean> {
		return (await this.objectRef.doc(id).delete()) != null;
	}
}
