import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChallengeService } from '../musa-services/challenge.service';
import { UserService } from '../musa-services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  challenges: any[] = [];
  myId = '';
  readonly orbImages = {
    explorer: './../../assets/explorer-orb.svg',
    energetic: './../../assets/energetic-orb.svg',
    trendsetter: './../../assets/explorer-orb.svg',
    challenger: './../../assets/explorer-orb.svg',
    stan: './../../assets/stan-orb.svg',
  };

  challengeTypeDisplayName = {
    explorer: 'Explorador',
    energetic: 'Energético',
    trendsetter: 'Criador de Tendências',
    challenger: 'Desafiante',
    stan: 'Stan',
  };

  constructor(
    private navCtrl: NavController,
    private challengeService: ChallengeService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getChallenges();
  }

  async getChallenges() {
    this.myId = await this.userService.getId();
    this.challenges = await this.challengeService.getChallengesByUserId();
  }

  isWinner(challenge) {
    const winner = { id: '', points: 0 };
    for (const id in challenge.challengeData) {
      if (Object.prototype.hasOwnProperty.call(challenge.challengeData, id)) {
        const element = challenge.challengeData[id];

        if (element.points > winner.points) {
          winner.id = id;
          winner.points = element.points;
        }
      }
    }
    return winner.id === this.myId ? 'Vitória' : 'Derrota';
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }
}
