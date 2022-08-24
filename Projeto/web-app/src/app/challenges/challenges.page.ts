import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from '../musa-services/endpoint.service';

@Component({
  selector: 'app-challenges',
  templateUrl: 'challenges.page.html',
  styleUrls: ['challenges.page.scss']
})
export class ChallengesPage {

  challengeUuid: string;

  constructor(public endpointService: EndpointService, private router: Router) {}

  viewChallenge() {
    this.router.navigateByUrl(`/challenge/view?id=${this.challengeUuid}`);
  }

}
