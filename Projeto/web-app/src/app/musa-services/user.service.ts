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

  async getUser(id: string) {
    try {
      const request = await this.http
        .get(`${environment.apiUrl}/${this.baseRoute}/${id}`)
        .toPromise();

      return request;
    } catch (error) {}
  }
}
