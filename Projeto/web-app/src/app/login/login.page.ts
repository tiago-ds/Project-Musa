import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EndpointService } from '../musa-services/endpoint.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hasCodeInParams: boolean;
  spotifyAuthorizationUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, private endpointService: EndpointService) {
    const params = new URLSearchParams({
      ['client_id']: environment.spotifyClientId,
      ['response_type']: 'code',
      ['redirect_uri']: environment.redirectUri,
      ['scope']: 'user-read-recently-played user-read-currently-playing user-read-private user-read-email'
    });

    this.spotifyAuthorizationUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params.code) {
        this.hasCodeInParams = true;
        await this.endpointService.login(params.code);
        setTimeout(() => { this.router.navigate(['home']); }, 300);
      } else {
        this.hasCodeInParams = false;
      }
    });
  }

}
