import { AngularFireObject } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { Product } from './../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) { }

    //   async getCart(): Promise<Observable<ShoppingCart>> {
    //     const cartId = await this.getOrCreateCartId();
    //     return this.db.object('/shopping-carts/' + cartId).valueChanges()
    //       .map((x: ShoppingCart) => new ShoppingCart(x.items));
    //   }



    async getCart(): Promise<Observable<ShoppingCart>> {
        const cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
            .map(x => new ShoppingCart(x.payload.exportVal().items));
    }

    async addToCart(product: Product) {
        this.updateItem(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItem(product, -1);
    }



    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime(),
        });
    }

    private getItem(cartId: string, productId: string) {
        return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).valueChanges();
    }

    private async getOrCreateCartId(): Promise<string> {
        const cartId = localStorage.getItem('cartId');
        if (cartId) { return cartId; }

        const result = await this.create();
        localStorage.setItem('cartId', result.key);
        return result.key;
    }

    async clearCart() {
        const cartId = await this.getOrCreateCartId();
        this.db.object('/shopping-carts/' + cartId + '/items').remove();
    }

    async removeItem(product: Product) {
        const cartId = await this.getOrCreateCartId();
        const item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
        item$$.remove();
    }

    private async updateItem(product: Product, change: number) {
        const cartId = await this.getOrCreateCartId();
        const item$: Observable<any> = this.getItem(cartId, product.key);
        const item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
        item$.take(1).subscribe(item => {
        if (item === null) {
            item$$.update({ ...product, quantity: 1 });
        } else {
            const quantity = (item.quantity || 0) + change;
            if (quantity === 0) { this.removeItem(product); }
            item$$.update({
                quantity
            }); }
        });
    }

}
