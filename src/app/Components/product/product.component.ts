import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductApiService } from 'src/app/Services/product-api.service';
import { ProductView } from 'src/app/Models/productView';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  //product user clicked on has to be initialized
  product: Product = {
    asin: 'asflk', title: "banana", price: { value: 2.99, currency: "USD" }, image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg"
  }
  productView: ProductView = { id: 'ag', name: 'test', description: '', price: 99.99, inventory: 1 };
  showInventory: boolean = false;
  // This list is the list of products from the DB.
  productsApi: ProductView[] = [];
  //users cart, stored in sessionStorage
  cart: Product[]
  //used to parse cart
  cartString?: string | null

  constructor(
    private productService: ProductService,
    private productApiService: ProductApiService,
    private route: ActivatedRoute,
    private location: Location

  ) {
    this.cart = []; 
    this.getProduct(); 
    this.postProductToApi();
    //this.getProductListing();
  }

  ngOnInit(): void {
    
  }

  // gets a single product from the product list stored in the sessionStorage
  getProduct(): void {
    const id: string = this.route.snapshot.paramMap.get('id')!;
    // console.log(id);
    const item = this.productService.getProduct(id);
    this.product = item;
  }

  // this function returns the list of products from the DB
  // getProductListing(): void {
  //   this.productApiService.ProductList()
  //     .subscribe(productlisting => {
  //       this.productsApi = productlisting;
  //       console.log(this.productsApi);
  //     });
  // }

  checkInventory() {
    this.getProductFromApi(this.product.asin);
    this.showInventory = true;
  }

  postProductToApi(): void {
    const p: ProductView = { id: this.product.asin, name: this.product.title, description: '', price: this.product.price.value, inventory: 10 };
    // console.log(p);
    this.productApiService.addProduct(p).subscribe();
  }

  getProductFromApi(id: string): void {
    this.productApiService.getProduct(id)
      .subscribe(prod => this.productView = prod);
    console.log(`Got clicked product from back end: ${this.productView.name}`)
  }

  goBack(): void {
    this.location.back();
  }
  
  addToCart(id: string): void {

    this.cartString = sessionStorage.getItem("cart")

    if (this.cartString != null) this.cart = JSON.parse(this.cartString);
    //user automatically has an empty cart in sessionStorage, as opposed to no cart at all
    else sessionStorage.setItem("cart", JSON.stringify(this.cart))

    this.setOutOfStockBool(id);
  }
  
  setOutOfStockBool(id: string): void{this.productApiService.outOfStock(id).then(outOfStock => 
    {if (!outOfStock) { console.log("item added to cart");this.cart.push(this.product); sessionStorage.setItem("cart", JSON.stringify(this.cart)) }})}
}
