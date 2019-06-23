import { ProductService } from './../../../service/product.service';
import { CategoryService } from './../../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { toast } from 'angular2-materialize';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {} as any;
  id;
  product$: Observable<any>;

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {

    // getting product categries from firebase ..
    this.categories$ = categoryService.getCategories();
    // getting key from navbar to query product
    this.id = this.route.snapshot.paramMap.get('id');
    // getting product value and key from firebase ..
    this.product$ = productService.get(this.id);

    if (this.id) { this.productService.get(this.id).take(1).subscribe(p => this.product = p); }
  }
  ngOnInit() {

  }

  // saving order data to firebase
  save(product) {
    if (this.id) {
      toast('Updated !', 4000);
      this.productService.update(this.id, product);
    }
    // tslint:disable-next-line: one-line
    else {
      toast('product Saved!', 4000);
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product..??')) { return; }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    toast('DELETED !', 4000);
  }

}

