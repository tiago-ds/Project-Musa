import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../musa-services/auth.service';
import { UserService } from '../musa-services/user.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-me',
  templateUrl: 'me.page.html',
  styleUrls: ['me.page.scss'],
})
export class MePage implements OnInit {
  public userData;

  constructor(
    public userService: UserService,
    private authService: AuthService,
    public toastController: ToastController,
    public router: Router
  ) {}

  ngOnInit() {
    this.userService.getMe().then((data) => {
      this.userData = data;
    });
  }

  async copyId() {
    await navigator.clipboard.writeText(this.userData.id);
    this.presentToast('ID Copiado.');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
