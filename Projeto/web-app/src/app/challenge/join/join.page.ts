import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ChallengeService } from 'src/app/musa-services/challenge.service';
import { AlertController } from '@ionic/angular';
import { presentToast } from '../../utils/toast.util';

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
      if(error.status === 400 || error.status === 404) {
        presentToast(`Desafio de id "${this.challengeUuid}" não encontrado.`);
      } else {
        presentToast('Erro desconhecido.');
      }
    }
  }
}
