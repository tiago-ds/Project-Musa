import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from '../musa-services/endpoint.service';

@Component({
  selector: 'app-me',
  templateUrl: 'me.page.html',
  styleUrls: ['me.page.scss']
})
export class MePage {

  constructor(public endpointService: EndpointService, public router: Router) {
  }

  logout() {
    this.endpointService.logout();
    this.router.navigate(['login']);
  }

}
