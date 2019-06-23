import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, observable } from 'rxjs';
import { toast } from 'angular2-materialize';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    toast('LOGIN !', 4000);
  }

  logout() {
    this.afAuth.auth.signOut();
    toast('LOGOUT !', 4000);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        // tslint:disable-next-line:curly
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });
  }

}
