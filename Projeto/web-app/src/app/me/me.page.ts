import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../musa-services/auth.service';
import { UserService } from '../musa-services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: 'me.page.html',
  styleUrls: ['me.page.scss'],
})
export class MePage {
  constructor(
    public userService: UserService,
    private authService: AuthService,
    public router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
