export interface MusaResponse<T> {
	message: string;
	data?: T;
	statusCode?: number;
}
