import { HttpClient } from '@angular/common/http';
import { SpotifyCredentials } from './../models/spotifyCredentials';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private baseRoute: string;
  private credentials: SpotifyCredentials;

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
    this.storage.get('user-credentials').then((credentials) => {
      this.credentials = credentials;
    });
  }

  async createChallenge(
    challengeType,
    challengeTime: number,
    artist: string = null
  ) {
    try {
      const user = await this.storage.get('user');
      const request = await this.http
        .post(`${environment.apiUrl}/challenge`, {
          type: challengeType,
          artist,
          finished: false,
          startingTimestamp: Date.now(),
          finishingTime: new Date().getTime() + challengeTime * 1000,
          lastUpdated: Date.now(),
          challengeData: {
            [user.id]: {
              name: user.display_name,
              points: 0,
              listenedSongs: [],
              pictureUrl: user.images[0].url,
            },
          },
        })
        .toPromise();
      return request;
    } catch (error) {}
  }

  async viewChallenge(challengeUuid) {
    const request = await this.http
      .get(`${environment.apiUrl}/challenge/${challengeUuid}`)
      .toPromise();

    return request;
  }

  async joinChallenge(challengeUuid: string) {
    const user = await this.storage.get('user');
    const request = await this.http
      .put(`${environment.apiUrl}/challenge/${challengeUuid}`, {
        user,
      })
      .toPromise();

    return request;
  }

  async search(searchTerm: string) {
    const user = await this.storage.get('user');
    const response = (await this.http
      .get(`${environment.apiUrl}/challenge/search/${searchTerm}`, {
        params: {
          id: user.id,
        },
      })
      .toPromise()) as Array<any>;
    return response;
  }

  async getChallengesByUserId() {
    const user = await this.storage.get('user');
    const response = (await this.http
      .get(`${environment.apiUrl}/challenge/history/${user.id}`)
      .toPromise()) as Array<any>;
    return response;
  }
}
