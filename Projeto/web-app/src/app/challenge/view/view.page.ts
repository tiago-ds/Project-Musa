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
    challenger: 'Desafiante'
  };
  challengeTimeDisplayName = {
    3600000: '1 hora',
    7200000: '2 horas',
    14400000: '4 horas',
    43200000: '12 horas',
    86400000: '1 dia',
    172800000: '2 dias'
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
    this.route.queryParams.subscribe(async params => {
      if (!params.id) {
        this.goBack();
        return;
      }

      try {
        this.challenge = await this.challengeService.viewChallenge(params.id);

        if (!this.challenge.startingTimestamp) {
          return;
        }

        const totalPoints = this.challenge.challengerData.points + this.challenge.challengedData.points;

        if (totalPoints > 0) {
          this.challengerBarSize = (this.challenge.challengerData.points / totalPoints) * 100;
          this.challengedBarSize = (this.challenge.challengedData.points / totalPoints) * 100;

          if (this.challengerBarSize < 15) {
            this.challengerBarSize = 15;
            this.challengedBarSize = 85;
          }

          if (this.challengedBarSize < 15) {
            this.challengerBarSize = 85;
            this.challengedBarSize = 15;
          }

        } else {
          this.challengerBarSize = 50;
          this.challengedBarSize = 50;
        }

        this.startingTimeDisplayName = `começou ${formatRelative(
          Date.now(), this.challenge.startingTimestamp, {locale: ptBR})}`;
        this.endingTimeDisplayName = `${Number(this.challenge.startingTimestamp) + Number(this.challenge.time) > Date.now()
          ? 'termina' : 'terminou'} ${formatDistance(
          Date.now(),
          Number(this.challenge.startingTimestamp) + Number(this.challenge.time),
          {locale: ptBR}
          )}`;

        (this.challenge.challengerData.listenedSongs as Array<any>).forEach((song) => {
          song.userName = this.challenge.challenger;
          this.allHistory.push(song);
        });

        (this.challenge.challengedData.listenedSongs as Array<any>).forEach((song) => {
          song.userName = this.challenge.challenged;
          this.allHistory.push(song);
        });

        this.allHistory.sort((a, b) => a.timestamp - b.timestamp);

      } catch (e) {
        this.goBack();
      }
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

}
