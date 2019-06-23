import { ShoppingCartService } from './../../service/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { map } from 'rxjs-compat/operator/map';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  categories$: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;
  order: Subscription;
  category: string;


  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private categoryService: CategoryService,
    private db: AngularFireDatabase) { }

  async ngOnInit() {
    // GETTING CATEGORY FORM NAVIGATION
    this.categories$ = this.categoryService.getCategories();

    this.populateProduct();

    this.cart$ = await this.shoppingCartService.getCart();

  }

  private populateProduct() {
    // Use snapshotChanges().map() to store the key
    this.productService.getAll().subscribe((products: any) => this.products = products);

    this.productService.getAll().switchMap((products: Product[]) => {
      this.products = products;
      return this.route.queryParamMap;
    }).subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }


}
