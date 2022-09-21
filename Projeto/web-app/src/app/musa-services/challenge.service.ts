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

  async createChallenge(challengeType, challengeTime: number) {
    try {
      const user = await this.storage.get('user');
      const request = await this.http
        .post(`${environment.apiUrl}/challenge`, {
          type: challengeType,
          finished: false,
          startingTimestamp: Date.now(),
          finishingTime: new Date().getTime() + challengeTime * 1000,
          lastUpdated: Date.now(),
          challengeData: {
            [user.id]: {
              name: user.display_name,
              points: 0,
              listenedSongs: [],
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

  async joinChallenge(challengeUuid) {
    const user = await this.storage.get('user');
    const request = await this.http
      .post(`${environment.apiUrl}/challenge/${challengeUuid}/join`, {
        credentials: user.credentials,
        userId: user.id,
      })
      .toPromise();

    return request;
  }
}
