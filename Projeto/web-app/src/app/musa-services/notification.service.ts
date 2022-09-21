import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseRoute: string;

  constructor(private http: HttpClient, private storage: Storage) {
    this.baseRoute = 'notification';
    this.storage.create();
  }

  async getNotifications() {
    try {
      const user = await this.storage.get('user');
      const request = await this.http
        .get(`${environment.apiUrl}/${this.baseRoute}/?userId=${user.id}`)
        .toPromise();

      return request;
    } catch (error) {}
  }

  async readNotification(notificationId: string) {
    try {
      const user = await this.storage.get('user');
      const request = await this.http
        .delete(
          `${environment.apiUrl}/${this.baseRoute}/?userId=${user.id}&notificationId=${notificationId}`
        )
        .toPromise();

      return request;
    } catch (error) {}
  }
}
