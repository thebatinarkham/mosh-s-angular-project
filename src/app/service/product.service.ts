import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  // saving order data to firebase : orderComponents
  create(product) {
    return this.db.list('/products').push(product);
  }


  // get all product for edit
  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ));
  }

  // update product after edit..
  update(productId, product) {
    return this.db.object(`products/${productId}`).update(product);
  }
k
  // delete product object : ordercomponent
  delete(productId) {
    return this.db.object(`products/${productId}`).remove();
  }

  // getting product from firebase for edit order (forms) : fomrscomponents
  get(productId) {
    return this.db.object(`products/${productId}`).valueChanges();
    // give u object related to key....

  }
  getOrder(productId) {
    return this.db.list(`orders/${productId}/items`).valueChanges();
  }


}
