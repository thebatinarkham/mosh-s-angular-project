import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }


  // get Catergorires from firebase : order components...
  getCategories() {
    return this.db.list('/categories').valueChanges();
  }

  
  getAll() {
    return this.db.list('/categories').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ));
}

  // return this.db.list('/categories', {
  //   query: {
  //     orderByChild: 'name'
  //   }
  // });


}
