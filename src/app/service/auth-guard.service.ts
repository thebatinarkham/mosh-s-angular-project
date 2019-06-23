import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      if (user) { return true; }

      this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      return false;
    });
  }
}



