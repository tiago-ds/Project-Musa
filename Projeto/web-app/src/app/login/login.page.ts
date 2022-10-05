import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../musa-services/auth.service';
import { EndpointService } from '../musa-services/endpoint.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hasCodeInParams: boolean;
  spotifyAuthorizationUrl: string;
  authUrlPresent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAuthorizeUrl();
    this.route.queryParams.subscribe(async (params) => {
      if (params.code) {
        this.hasCodeInParams = true;
        const tokens = await this.authService.codeGrant(params.code);
        await this.authService.login(tokens);
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 300);
      } else {
        this.hasCodeInParams = false;
      }
    });
  }

  async getAuthorizeUrl() {
    try {
      const request = await this.authService.getAuthorizeUrl();
      if (request) this.authUrlPresent = true;
      this.spotifyAuthorizationUrl = request as string;
    } catch (error) {}
  }
}
