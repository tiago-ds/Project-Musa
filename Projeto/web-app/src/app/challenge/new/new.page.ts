import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { EndpointService } from 'src/app/musa-services/endpoint.service';
import { ChallengeService } from 'src/app/musa-services/challenge.service';
import { NotificationService } from '../../musa-services/notification.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewChallengePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  challengeType: string;
  challengeTime: number;
  challenge;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private endpointService: EndpointService,
    private challengeService: ChallengeService,
    private notificationService: NotificationService,
    public alertController: AlertController
  ) {
    this.challengeType = 'explorer';
    this.challengeTime = 3600;
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  async createChallenge() {
    try {
      this.challenge = await this.challengeService.createChallenge(
        this.challengeType,
        this.challengeTime
      );
      this.modal.present();
    } catch (error) {
      this.presentErrorAlert();
    }
  }

  onModalDismissed() {
    this.router.navigateByUrl(`/challenge/view?id=${this.challenge.id}`);
  }

  sendNotification(userId) {
    this.notificationService.sendNotification(userId, this.challenge);
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Algo deu errado na criação do desafio',
      message: 'Sair e fazer login novamente pode ajudar.',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
        },
        {
          text: 'Sair e fazer login',
          handler: () => {
            this.endpointService.logout();
            this.router.navigate(['login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
