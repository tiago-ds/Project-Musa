/* eslint-disable no-underscore-dangle */
import { ChallengeService } from 'src/app/musa-services/challenge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { formatRelative } from 'date-fns';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewChallengePage implements OnInit {
  challenge;
  challengeTypeDisplayName = {
    explorer: 'Explorador',
    energetic: 'Energético',
    trendsetter: 'Criador de Tendências',
    challenger: 'Desafiante',
    stan: 'Stan',
  };
  challengeTimeDisplayName = {
    3600000: '1 hora',
    7200000: '2 horas',
    14400000: '4 horas',
    43200000: '12 horas',
    86400000: '1 dia',
    172800000: '2 dias',
  };
  challengerBarSize = 50;
  challengedBarSize = 50;
  startingTimeDisplayName = '';
  endingTimeDisplayName = '';
  allHistory = [];
  readonly orbImages = {
    explorer: './../../../assets/explorer-orb.svg',
    energetic: './../../../assets/energetic-orb.svg',
    trendsetter: './../../../assets/explorer-orb.svg',
    challenger: './../../../assets/explorer-orb.svg',
    stan: './../../../assets/stan-orb.svg',
  };

  private _challengeParticipants = [];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    public toastController: ToastController,
  ) {}

  get finished() {
    return Number(this.challenge.finishingTime) < Date.now();
  }

  get challengeParticipants() {
    return this._challengeParticipants.sort((a, b) => b.points - a.points);
  }

  set challengeParticipants(value) {
    this._challengeParticipants = value;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (!params.id) {
        this.goBack();
        return;
      }

      try {
        this.challenge = await this.challengeService.viewChallenge(params.id);
        console.log(this.challenge);
        let totalPoints = 0;

        Object.keys(this.challenge.challengeData).forEach((userId) => {
          totalPoints += this.challenge.challengeData[userId].points;
        });

        Object.keys(this.challenge.challengeData).forEach((userId) => {
          const name = this.challenge.challengeData[userId].name;
          const points = this.challenge.challengeData[userId].points;
          const pictureUrl = this.challenge.challengeData[userId].pictureUrl;
          const participant = {
            name,
            points,
            percentage: (points / totalPoints) * 100,
            pictureUrl,
          };
          this._challengeParticipants.push(participant);
        });

        if (!this.challenge.startingTimestamp) {
          return;
        }

        this.getChallengeUserIds().forEach((userId) => {
          this.challenge.challengeData[userId].listenedSongs.forEach(
            (history) => {
              this.allHistory.push({
                ...history,
                userName: this.challenge.challengeData[userId].name,
              });
            }
          );
        });

        this.startingTimeDisplayName = `começou ${formatRelative(
          this.challenge.startingTimestamp,
          Date.now(),
          { locale: ptBR }
        )}`;
        this.endingTimeDisplayName = `${
          Number(this.challenge.finishingTime) > Date.now()
            ? 'termina em'
            : 'terminou a'
        } ${formatDistance(Date.now(), Number(this.challenge.finishingTime), {
          locale: ptBR,
        })}`;

        this.allHistory.sort((a, b) => a.timestamp - b.timestamp).reverse();
      } catch (e) {
        console.log(e);
        this.goBack();
      }
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  async copyId() {
    await navigator.clipboard.writeText(this.challenge.id);
    this.presentToast('ID Copiado.');
  }

  getChallengeUserIds() {
    return Object.keys(this.challenge.challengeData);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
