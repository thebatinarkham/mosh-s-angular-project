import { ShoppingCart } from './../../models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('cart') cart: ShoppingCart;
  constructor() { }


}
