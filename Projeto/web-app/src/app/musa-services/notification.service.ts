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
    const user = await this.storage.get('user');

    try {
      const request = await this.http
        .delete(
          `${environment.apiUrl}/${this.baseRoute}/?userId=${user.id}&notificationId=${notificationId}`
        )
        .toPromise();

      return request;
    } catch (error) {}
  }

  async sendNotification(userId: string, challenge) {
    const user = await this.storage.get('user');

    const notification = {
      read: false,
      message: `${user.display_name} está te convidando para um Desafio do tipo ${challenge.type}!`,
      type: 'challengeRequest',
      userData: null,
      challenge,
    };

    try {
      const request = await this.http
        .post(
          `${environment.apiUrl}/${this.baseRoute}?userId=${userId}`,
          notification
        )
        .toPromise();

      return request;
    } catch (error) {}
  }
}
