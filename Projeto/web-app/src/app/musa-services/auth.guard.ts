import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private endpointService: EndpointService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        this.endpointService.isLoggedIn().then((isLoggedIn) => {
          if (isLoggedIn) {
            resolve(true);
          } else {
            this.router.navigate(['login']);
            resolve(false);
          }

        });
      });
    }

}
