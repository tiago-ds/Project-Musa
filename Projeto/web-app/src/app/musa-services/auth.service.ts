import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { SpotifyCredentials } from '../models/spotifyCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseRoute: string;
  public get userData() {
    return this._userData;
  }
  public set userData(value: any) {
    this._userData = value;
  }
  private _userData;
  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
    this.storage.get('user').then((user) => {
      this.userData = user;
    });
    this.baseRoute = 'auth';
  }

  async getAuthorizeUrl() {
    try {
      const request = await this.http
        .get(`${environment.apiUrl}/${this.baseRoute}/auth_url`, {
          params: {
            redirectUri: environment.redirectUri,
          },
        })
        .toPromise();

      return request;
    } catch (error) {}
  }

  async isLoggedIn(): Promise<boolean> {
    const credentials = (await this.storage.get(
      'user-credentials'
    )) as SpotifyCredentials;
    this.userData = await this.storage.get('user');
    if (!credentials) {
      return false;
    } else if (credentials.expires_at > Date.now()) {
      return true;
    } else {
      return this.refreshToken(credentials);
    }
  }

  async codeGrant(authorizationCode: string) {
    try {
      const request = (await this.http
        .post(`${environment.apiUrl}/${this.baseRoute}/credentials`, {
          code: authorizationCode,
          redirectUri: environment.redirectUri,
        })
        .toPromise()) as SpotifyCredentials;

      const requestCredentials = {
        ...request,
        expires_at: Date.now() + request.expires_in * 1000,
      };
      await this.storage.set('user-credentials', requestCredentials);
      return requestCredentials;
    } catch (error) {}
  }

  async login(tokens: Object) {
    try {
      const request = await this.http
        .post(`${environment.apiUrl}/${this.baseRoute}/login`, {
          ...tokens,
        })
        .toPromise();

      await this.storage.set('user', (request as any).body);
    } catch (error) {}
  }

  async refreshToken(credentials: SpotifyCredentials) {
    try {
      const request = (await this.http
        .post(`${environment.apiUrl}/${this.baseRoute}/refresh_token`, {
          acess_token: credentials.access_token,
          refresh_token: credentials.refresh_token,
        })
        .toPromise()) as SpotifyCredentials;

      if (request) {
        const requestCredentials = {
          ...credentials,
          ...request,
          expires_at: Date.now() + credentials.expires_in * 1000,
        };
        await this.storage.set('user-credentials', requestCredentials);
        return true;
      } else {
        return false;
      }
    } catch (error) {}
  }

  logout() {
    this.storage.clear();
    this._userData = null;
  }
}
