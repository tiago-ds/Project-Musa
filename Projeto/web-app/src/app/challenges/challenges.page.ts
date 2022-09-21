import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { NotificationService } from '../musa-services/notification.service';
import { UserService } from '../musa-services/user.service';

@Component({
  selector: 'app-challenges',
  templateUrl: 'challenges.page.html',
  styleUrls: ['challenges.page.scss'],
})
export class ChallengesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  challengeUuid: string;
  public notifications = [];

  constructor(
    public userService: UserService,
    private router: Router,
    public notificationService: NotificationService
  ) {}

  viewChallenge() {
    this.router.navigateByUrl(`/challenge/view?id=${this.challengeUuid}`);
  }

  ngOnInit() {
    this.notificationService.getNotifications().then((data) => {
      this.notifications = data as any;
    });
  }

  readNotification(notificationId) {
    this.notificationService.readNotification(notificationId).then((data) => {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== notificationId
      );
      console.log(this.notifications);
    });
  }

  openModal() {
    if (!this.notifications.length) return;
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }

  print(message) {
    console.log(message);
  }
}
