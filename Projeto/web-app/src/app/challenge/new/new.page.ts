import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { EndpointService } from 'src/app/musa-services/endpoint.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewChallengePage implements OnInit {

  challengeType: string;
  challengeTime: number;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private endpointService: EndpointService,
    public alertController: AlertController) {
    this.challengeType = 'explorer';
    this.challengeTime = 3600000;
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  async createChallenge() {
    try {
      const challenge: any = await this.endpointService.newChallenge({
        type: this.challengeType,
        finished: false,
        startingTimestamp: Date.now(),
        finishingTime: Date.now() + this.challengeTime,
        lastUpdated: Date.now()
      });
      this.router.navigateByUrl(`/challenge/view?id=${challenge.data}`);
    } catch (error) {
      this.presentErrorAlert();
    }
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Algo deu errado na criação do desafio',
      message: 'Sair e fazer login novamente pode ajudar.',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
        }, {
          text: 'Sair e fazer login',
          handler: () => {
            this.endpointService.logout();
            this.router.navigate(['login']);
          }
        }
      ]
    });

    await alert.present();
  }

}
