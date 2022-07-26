import SpotifyApiFacade from "../facades/spotifyApiFacade";

export class MusicServiceFactory {
    create(type: string) {
        switch(type) {
            case "spotify":
                return new SpotifyApiFacade();
            case "deezer":
                //return new DeezerApiFacade();
        }   
    }
}