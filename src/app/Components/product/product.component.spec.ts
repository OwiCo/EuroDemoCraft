import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductService } from 'src/app/Services/product.service';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/Models/product';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
//things being faked to test 'Add_item_to_cart': product, sessionStorage(getitem,setitem), service call

describe('ProductComponent', () => {
  let component: ProductComponent;
  let service: ProductService;
  let fixture: ComponentFixture<ProductComponent>;
  let map = new Map();

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ ProductComponent ]
  //   })
  //   .compileComponents();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ProductComponent],
      providers: [ProductService]
    });
    fixture = TestBed.createComponent(ProductComponent);
    service = fixture.debugElement.injector.get(ProductService);
    component = fixture.componentInstance;
    component.product = {
      asin: 'ABCDE12345',
      title: 'pineapple',
      price: { value: 9.99, currency: 'USD' },
      image: 'https://m.media-amazon.com/images/I/71+qAJehpkL._SL1500_.jpg'
    };
    fixture.detectChanges();
  });

  beforeAll(() => {
    // Mock localStorage
    spyOn(sessionStorage, 'getItem').and.callFake((key: string): any => {
      let val = map.get(key);
      if (val == undefined) return null;
      else return val;
    });

    spyOn(sessionStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        map.set(key, value);
      }
    );

    spyOn(sessionStorage, 'clear').and.callFake(() => {
      map.clear();
    });
  });

  //things relevant to testing 'Add_item_to_cart':out of stock, not out of stock, cart empty, cart not empty, no cart to begin with
  it('when out of stock and user never had a cart to begin with, cart remains empty', () => {
    spyOn(service, 'outOfStock').and.returnValue(of(true));
    component.addToCart(component.product.asin);
    expect(JSON.parse(map.get('cart')).length).toBe(0);
    map.clear();
  });

  it('when in stock and cart not empty, cart will contain an additional item', () => {
    let cart: Product[] = [
      {
        asin: 'ZYXW9876',
        title: 'soap',
        price: { value: 2.99, currency: 'USD' },
        image: 'https://dkstore.online/wp-content/uploads/2016/03/41.jpg',
      },
      {
        asin: 'ZYXW5432',
        title: 'sun glasses',
        price: { value: 10.99, currency: 'USD' },
        image:
          'https://cdn.shopify.com/s/files/1/0898/5824/products/HighKey_Black-Fade_1025x.jpg?v=1602612822',
      },
    ];
    map.set('cart', JSON.stringify(cart));
    spyOn(service, 'outOfStock').and.returnValue(of(false));
    component.addToCart(component.product.asin);
    expect(JSON.parse(map.get('cart')).length).toEqual(3);
    map.clear();
  });

  //automatically generated test
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
