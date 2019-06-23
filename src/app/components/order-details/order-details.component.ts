import { ProductService } from './../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  product: unknown;
  id: string;

  constructor(private route: ActivatedRoute,
    private productService: ProductService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.productService.getOrder(this.id).take(1).subscribe(p => this.product = p); }
  }

  ngOnInit() {
  }

}
