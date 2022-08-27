import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  get userData() {
    return this._userData;
  }

  set userData(value: any) {
    this._userData = value;
  }

  _userData;

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
    this.storage.get('user').then((user) => {
      this._userData = user?.userData;
    });
  }

  async login(authorizationCode: string) {
    try {
      const request = await this.http
        .post(`${environment.apiUrl}/login`, {
          authorizationCode,
          redirectUri: environment.redirectUri,
        })
        .toPromise();

      this.storage.set('user', request);
      this._userData = (request as any).userData;
    } catch (error) {}
  }

  logout() {
    this.storage.clear();
    this._userData = null;
  }

  async isLoggedIn(): Promise<boolean> {
    return (await this.storage.get('user')) != null;
  }

  async newChallenge(challengeRequest) {
    try {
      const user = await this.storage.get('user');
      const request = await this.http
        .post(`${environment.apiUrl}/challenge/new`, {
          credentials: user.credentials,
          userId: user.id,
          challengeRequest,
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
