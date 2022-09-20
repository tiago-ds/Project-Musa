export interface TrackInfo {
	track: SpotifyApi.SingleTrackResponse;
	trackFeatures?: SpotifyApi.AudioFeaturesResponse;
	playedAt: string;
}
