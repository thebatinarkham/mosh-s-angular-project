import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {

  }

  // user object
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      imageUrl: user.photoURL,
    });
  }

  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
 }
}
