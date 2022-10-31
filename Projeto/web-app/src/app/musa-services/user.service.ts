import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userData;
  private baseRoute;

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
    this.storage.get('user').then((storedUser) => {
      this.userData = storedUser;
    });
    this.baseRoute = 'user';
  }

  async getId() {
    const user = await this.storage.get('user');
    return user.id;
  }

  async getMe() {
    try {
      const credentials = await this.storage.get('user-credentials');
      const request = await this.http
        .get(`${environment.apiUrl}/${this.baseRoute}/me`, {
          headers: {
            Authorization: `${credentials.access_token}`,
          },
        })
        .toPromise();

      return request;
    } catch (error) {
      console.log(error);
    }
  }
}
