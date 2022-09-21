import { ChallengeService } from 'src/app/musa-services/challenge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { formatRelative } from 'date-fns';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (!params.id) {
        this.goBack();
        return;
      }

      try {
        this.challenge = await this.challengeService.viewChallenge(params.id);

        if (!this.challenge.startingTimestamp) {
          return;
        }

        let totalPoints = 0;

        this.getChallengeUserIds().forEach((userId) => {
          totalPoints += this.challenge.challengeData[userId].points;
        });

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
          Date.now(),
          this.challenge.startingTimestamp,
          { locale: ptBR }
        )}`;
        this.endingTimeDisplayName = `${
          Number(this.challenge.startingTimestamp) +
            Number(this.challenge.time) >
          Date.now()
            ? 'termina'
            : 'terminou'
        } ${formatDistance(
          Date.now(),
          Number(this.challenge.startingTimestamp) +
            Number(this.challenge.time),
          { locale: ptBR }
        )}`;

        this.allHistory.sort((a, b) => a.timestamp - b.timestamp);
      } catch (e) {
        console.log(e);
        this.goBack();
      }
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  getChallengeUserIds() {
    return Object.keys(this.challenge.challengeData);
  }
}
