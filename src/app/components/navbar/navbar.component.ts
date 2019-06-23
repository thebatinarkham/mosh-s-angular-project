import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { toast } from 'angular2-materialize';
import { AppUser } from 'src/app/models/app-user';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: any;

  constructor(public auth: AuthService,
    private shoppingCartService: ShoppingCartService) {


  }


  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();

  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

}


