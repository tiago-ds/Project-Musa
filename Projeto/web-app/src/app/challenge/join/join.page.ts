import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ChallengeService } from 'src/app/musa-services/challenge.service';
import { EndpointService } from 'src/app/musa-services/endpoint.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinChallengePage implements OnInit {

  challengeUuid: string;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private challengeService: ChallengeService,
    public alertController: AlertController) {
    this.challengeUuid = '';
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  async joinChallenge() {
    try {
      const challenge: any = await this.challengeService.joinChallenge(this.challengeUuid);
      this.router.navigateByUrl(`/challenge/view?id=${challenge.id}`);
    } catch (error) {
      if (error.error.error === 'Error: ChallengedIsChallenger') {
        this.presentSameUserAlert();
      }
      if (error.error.error === 'Error: ChallengeAlreadyStarted') {
        this.presentAlreadyStartedAlert();
      }
      if (error.error.error === 'Error: ChallengeNotExistsInDatabase') {
        this.presentNotFoundAlert();
      }
    }
  }

  async presentAlreadyStartedAlert() {
    const alert = await this.alertController.create({
      header: 'Este desafio já começou.',
      message: 'Crie um novo na tela inicial.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentSameUserAlert() {
    const alert = await this.alertController.create({
      header: 'Você já está nesse desafio.',
      message: 'Outra pessoa precisa entrar nesse desafio para iniciá-lo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentNotFoundAlert() {
    const alert = await this.alertController.create({
      header: 'Desafio não encontrado.',
      message: 'Tente novamente ou crie um novo na tela inicial.',
      buttons: ['OK']
    });

    await alert.present();
  }


}
