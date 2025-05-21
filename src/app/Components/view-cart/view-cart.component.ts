import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
    //users cart, stored in sessionStorage
    cart : Product[] = [];
    //used to parse cart
    cartString ?: string | null
    cartEmpty: string = "Empty cart";
    isEmpty: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.getCart();
  }

  // prints to the user their cart is empty
  printEmpty(): string {
    return this.cartEmpty;
  }

  // get the customer's cart stored in sessionStorage
  getCart(): void {
    this.cartString = sessionStorage.getItem('cart');
    if (this.cartString == null) {
      this.printEmpty();
    }
    else {
      this.isEmpty = !this.isEmpty;
      this.cart = JSON.parse(this.cartString);
    }
  }

}
