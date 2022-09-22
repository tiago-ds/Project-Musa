export interface DatabaseCommunicationInterface {
	save(object: Object, id: string): Object;
	get(id: string): Object;
	update(object: Object, id: string): Object;
	delete(id: string): Object;
}
