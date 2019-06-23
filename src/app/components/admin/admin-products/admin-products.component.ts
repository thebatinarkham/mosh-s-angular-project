import { Product } from './../../../models/product';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  fiteredProducts: any[];
  subscription: Subscription;

  constructor(private db: AngularFireDatabase,
              private productService: ProductService) {
     this.subscription = this.productService.getAll().subscribe
      ((product: Product[]) => this.fiteredProducts = this.products = product);
  }

  filter(query) {
    this.fiteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
